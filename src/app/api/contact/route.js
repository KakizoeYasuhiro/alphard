import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// RESENDクライアントの初期化
const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// 送信先のメールアドレス
const toEmail = ['kakizoe@torque.blue', 'badtripping@gmail.com', 'takaton0526alive@gmail.com'];
// 送信元のメールアドレス
const fromEmail = 'contact@alphard.info';

// HTMLエスケープ関数
function htmlEscape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    // リクエストボディから データを取得
    const rawData = await request.json();
    
    const { recaptchaToken, ...formData } = rawData;
    const { contactType, name, email, message } = formData;

    // reCAPTCHA トークンを検証
    if (!recaptchaToken) {
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
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaVerifyResult = await recaptchaVerifyResponse.json();

    if (!recaptchaVerifyResult.success || recaptchaVerifyResult.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA の検証に失敗しました。', details: recaptchaVerifyResult['error-codes'] || 'Low score' },
        { status: 400 }
      );
    }

    // 入力値の検証
    if (!contactType || !name || !email || !message) {
      return NextResponse.json(
        { error: 'すべての必須項目を入力してください。' },
        { status: 400 }
      );
    }

    // メールアドレスの基本的な検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      );
    }

    // 入力値をHTMLエスケープ
    const escapedType = htmlEscape(contactType);
    const escapedName = htmlEscape(name);
    const escapedEmail = htmlEscape(email);
    const escapedMessage = htmlEscape(message);

    // お問い合わせの種類を日本語に変換
    const contactTypeMap = {
      'ライブについて': 'ライブについて',
      'グッズについて': 'グッズについて', 
      'アーティスト本人について': 'アーティスト本人について',
      '出演・取材依頼について': '出演・取材依頼について',
      '楽曲使用について': '楽曲使用について',
      'その他': 'その他'
    };

    const contactTypeJapanese = contactTypeMap[escapedType] || escapedType;

    // 管理者向けメールの送信
    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `【Alphard】${contactTypeJapanese} - ${escapedName}様からのお問い合わせ`,
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
              <p><strong>お名前:</strong> ${escapedName}</p>
              <p><strong>メールアドレス:</strong> ${escapedEmail}</p>
              
              <h4 style="color: #2c3e50; margin-top: 20px;">メッセージ:</h4>
              <div style="background-color: white; padding: 15px; border-radius: 3px; border-left: 4px solid #3498db;">
                ${escapedMessage.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>このメールは Alphard の お問い合わせフォームから自動送信されました。</p>
              <p>送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
              <p>reCAPTCHA スコア: ${recaptchaVerifyResult.score}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: email, // 返信先をユーザーのメールアドレスに設定
    });

    // 管理者向けメール送信が成功した場合
    if (adminEmailResult.data) {
      return NextResponse.json(
        { 
          message: 'お問い合わせありがとうございます。メッセージを受け付けました。',
          emailId: adminEmailResult.data.id
        },
        { status: 200 }
      );
    } else {
      throw new Error('メール送信に失敗しました');
    }

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'メール送信中にエラーが発生しました。しばらく経ってから再度お試しください。',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 