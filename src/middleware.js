import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // 1. HTTPS リダイレクト（本番環境のみ）
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') !== 'https' &&
      !url.hostname.includes('localhost')) {
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }

  // 2. レスポンスにセキュリティヘッダーを追加
  const response = NextResponse.next();
  
  // APIルートに対する追加のセキュリティヘッダー
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // API専用のセキュリティヘッダー
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // CORS ヘッダー（本番では厳密に）
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://alphard.info'] 
      : ['http://localhost:3000', 'http://127.0.0.1:3000'];
    
    const origin = request.headers.get('origin');
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    // API レート制限情報（将来的にAPIキー制限など）
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Window', '3600'); // 1時間
  }

  // 4. 一般的なセキュリティヘッダー（全てのルートに適用）
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // ブラウザのセキュリティ機能を有効化
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site');

  return response;
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: '/:path*',
};