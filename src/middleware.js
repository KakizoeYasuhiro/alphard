import { NextResponse } from 'next/server';

export function middleware(request) {
  // 環境変数からBasic認証情報を取得
  const basicAuthEnabled = process.env.BASIC_AUTH_ENABLED === 'true';
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

  // Basic認証が有効かつ認証情報が設定されている場合のみ検証
  if (basicAuthEnabled && basicAuthUser && basicAuthPassword) {
    // リクエストヘッダーからAuthorizationを取得
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      // Basic認証のフォーマット: "Basic base64(username:password)"
      const authValue = authHeader.split(' ')[1];
      const [user, password] = atob(authValue).split(':');

      // 認証情報の検証
      if (user === basicAuthUser && password === basicAuthPassword) {
        // 認証成功
        return NextResponse.next();
      }
    }

    // 認証失敗時は401レスポンスを返す
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Basic認証が無効または設定されていない場合はそのまま通す
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: '/:path*',
};