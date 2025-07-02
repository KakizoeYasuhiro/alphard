import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import rateLimiter from '@/lib/rateLimit';
import { validateFormData, sanitizeFormData } from '@/lib/inputValidation';
import { 
  getClientIP, 
  createSecurityLog, 
  detectMaliciousRequest,
  hashIP 
} from '@/lib/security';

// 環境変数の検証
const requiredEnvVars = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
};

// 起動時に環境変数をチェック
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// RESENDクライアントの初期化
const resend = new Resend(requiredEnvVars.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = requiredEnvVars.RECAPTCHA_SECRET_KEY;

// 送信先のメールアドレス
const toEmail = ['support@alphard.info', 'kakizoe@alphard.info', 'badtripping@gmail.com', 'takaton0526alive@gmail.com'];
// 送信元のメールアドレス
const fromEmail = 'contact@alphard.info';

// セキュリティログ出力関数
function logSecurityEvent(logData) {
  if (process.env.NODE_ENV === 'production') {
    // 本番環境では実際のログサービスに送信
    console.log('[SECURITY]', JSON.stringify(logData));
  } else {
    // 開発環境ではコンソール出力
    console.log('[SECURITY DEV]', logData);
  }
}

// OPTIONS ハンドラー（CORS preflight対応）
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://alphard.info' : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  const hashedIP = hashIP(clientIP);
  
  // セキュリティログの基本情報
  const baseLogData = createSecurityLog(request, 'CONTACT_FORM_SUBMISSION');
  
  try {
    // 1. レート制限チェック
    const rateLimitKey = hashedIP;
    if (rateLimiter.isRateLimited(rateLimitKey, 5, 15 * 60 * 1000)) { // 15分間に5回まで
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(rateLimitKey, 15 * 60 * 1000) / 1000 / 60);
      
      logSecurityEvent({
        ...baseLogData,
        action: 'RATE_LIMIT_EXCEEDED',
        details: { remainingTime, hashedIP }
      });
      
      return NextResponse.json(
        { 
          error: `送信回数が制限を超えました。${remainingTime}分後に再度お試しください。`,
          rateLimited: true,
          remainingTime
        },
        { status: 429, headers: { 'Retry-After': String(remainingTime * 60) } }
      );
    }

    // 2. リクエストサイズチェック
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50000) { // 50KB制限
      logSecurityEvent({
        ...baseLogData,
        action: 'PAYLOAD_TOO_LARGE',
        details: { contentLength, hashedIP }
      });
      
      return NextResponse.json(
        { error: '送信データが大きすぎます。' },
        { status: 413 }
      );
    }

    // 3. リクエストボディの取得と検証
    let rawData;
    try {
      rawData = await request.json();
    } catch (parseError) {
      logSecurityEvent({
        ...baseLogData,
        action: 'INVALID_JSON',
        details: { error: parseError.message, hashedIP }
      });
      
      return NextResponse.json(
        { error: '無効なデータ形式です。' },
        { status: 400 }
      );
    }
    
    const { recaptchaToken, ...formData } = rawData;

    // 4. 悪意あるリクエストの検出
    const maliciousCheck = detectMaliciousRequest(request, formData);
    if (maliciousCheck.isSuspicious) {
      logSecurityEvent({
        ...baseLogData,
        action: 'MALICIOUS_REQUEST_DETECTED',
        details: { 
          warnings: maliciousCheck.warnings,
          riskLevel: maliciousCheck.riskLevel,
          hashedIP
        }
      });

      // 高リスクの場合は即座にブロック
      if (maliciousCheck.riskLevel === 'HIGH') {
        return NextResponse.json(
          { error: 'セキュリティ上の理由により送信が拒否されました。' },
          { status: 403 }
        );
      }
    }

    // 5. フォームデータの検証
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      logSecurityEvent({
        ...baseLogData,
        action: 'VALIDATION_FAILED',
        details: { errors: validation.errors, hashedIP }
      });
      
      return NextResponse.json(
        { 
          error: '入力内容に問題があります。',
          validationErrors: validation.errors
        },
        { status: 400 }
      );
    }

    // 6. reCAPTCHA トークンの検証
    if (!recaptchaToken) {
      logSecurityEvent({
        ...baseLogData,
        action: 'MISSING_RECAPTCHA',
        details: { hashedIP }
      });
      
      return NextResponse.json(
        { error: 'reCAPTCHA トークンがありません。' },
        { status: 400 }
      );
    }

    const recaptchaVerifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${clientIP}`,
    });

    const recaptchaVerifyResult = await recaptchaVerifyResponse.json();

    if (!recaptchaVerifyResult.success) {
      logSecurityEvent({
        ...baseLogData,
        action: 'RECAPTCHA_FAILED',
        details: { 
          errors: recaptchaVerifyResult['error-codes'],
          hashedIP
        }
      });
      
      return NextResponse.json(
        { error: 'reCAPTCHA の検証に失敗しました。' },
        { status: 400 }
      );
    }

    // スコアが低い場合の追加チェック
    if (recaptchaVerifyResult.score < 0.3) {
      logSecurityEvent({
        ...baseLogData,
        action: 'LOW_RECAPTCHA_SCORE',
        details: { 
          score: recaptchaVerifyResult.score,
          hashedIP
        }
      });
      
      return NextResponse.json(
        { error: 'セキュリティ検証に失敗しました。しばらく経ってから再度お試しください。' },
        { status: 400 }
      );
    }

    // 7. データのサニタイゼーション
    const sanitizedData = sanitizeFormData(formData);

    // 8. お問い合わせの種類のマッピング
    const contactTypeMap = {
      '所属アーティストのライブについて': '所属アーティストのライブについて',
      'グッズ販売について': 'グッズ販売について', 
      '所属アーティストについて': '所属アーティストについて',
      '出演・取材依頼について': '出演・取材依頼について',
      '楽曲使用について': '楽曲使用について',
      'その他': 'その他'
    };

    const contactTypeJapanese = contactTypeMap[sanitizedData.contactType] || sanitizedData.contactType;

    // 9. 管理者向けメールの送信
    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `【Alphard】${contactTypeJapanese} - ${sanitizedData.name}様からのお問い合わせ`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>お問い合わせ</title>
        </head>
        <body style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
              新しいお問い合わせが届きました
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c3e50;">お問い合わせ内容</h3>
              <p><strong>種類:</strong> ${contactTypeJapanese}</p>
              <p><strong>お名前:</strong> ${sanitizedData.name}</p>
              <p><strong>メールアドレス:</strong> ${sanitizedData.email}</p>
              
              <h4 style="color: #2c3e50; margin-top: 20px;">メッセージ:</h4>
              <div style="background-color: white; padding: 15px; border-radius: 3px; border-left: 4px solid #3498db;">
                ${sanitizedData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>このメールは Alphard のお問い合わせフォームから自動送信されました。</p>
              <p>送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
              <p>reCAPTCHA スコア: ${recaptchaVerifyResult.score}</p>
              <p>セキュリティ情報: ${hashedIP} | ${maliciousCheck.riskLevel}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: sanitizedData.email,
    });

    // 10. メール送信結果の処理
    if (!adminEmailResult.data) {
      throw new Error('メール送信APIからの応答が不正です');
    }

    // 成功ログ
    const processingTime = Date.now() - startTime;
    logSecurityEvent({
      ...baseLogData,
      action: 'CONTACT_FORM_SUCCESS',
      details: { 
        emailId: adminEmailResult.data.id,
        processingTime,
        recaptchaScore: recaptchaVerifyResult.score,
        hashedIP
      }
    });

      return NextResponse.json(
        { 
          message: 'お問い合わせありがとうございます。メッセージを受け付けました。',
        submitted: true
        },
        { status: 200 }
      );

  } catch (error) {
    // エラーログ
    const processingTime = Date.now() - startTime;
    logSecurityEvent({
      ...baseLogData,
      action: 'CONTACT_FORM_ERROR',
      details: { 
        error: error.message,
        processingTime,
        hashedIP,
        // 本番環境では詳細なスタックトレースは記録しない
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });

    // エラーレスポンス（情報漏洩を防ぐため詳細は隠す）
    return NextResponse.json(
      { 
        error: 'メール送信中にエラーが発生しました。しばらく経ってから再度お試しください。',
        // 開発環境でのみ詳細情報を提供
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          timestamp: new Date().toISOString()
        })
      },
      { status: 500 }
    );
  }
} 