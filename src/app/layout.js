import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Inter } from 'next/font/google';

// システムフォントの代わりにInterフォントを使用
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-helvetica',
});

// エラー回避のために変数名を一致させる
const helvetica = inter;

export const metadata = {
  metadataBase: new URL('https://alphard.info'),
    title: 'Alphard Music',
  description: '音楽マネジメント事務所Alphard',

  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://alphard.info/',
    siteName: 'Alphard Music',
    title: 'Alphard Music',
    description: '音楽マネジメント事務所Alphard',
    images: [
      {
        url: 'https://alphard.info/images/top_sonoki.jpg',
        width: 1200,
        height: 630,
        alt: 'Alphard Music',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alphard Music',
    description: '音楽マネジメント事務所Alphard',
    images: [
      {
        url: 'https://alphard.info/images/top_sonoki.jpg',
        width: 1200,
        height: 630,
        alt: 'Alphard Music',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
        <html lang="ja" suppressHydrationWarning>
      <head>

        <link rel="stylesheet" href="/styles/recaptcha-hide.css" />
        {/* インラインスタイルを追加して reCAPTCHA バッジを確実に非表示にする */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Google reCAPTCHA バッジを確実に非表示にするためのインラインスタイル */
          .grecaptcha-badge, 
          .grecaptcha-badge *,
          iframe[src*="recaptcha"], 
          iframe[src*="google.com/recaptcha"],
          iframe[title*="recaptcha"],
          iframe[name*="recaptcha"], 
          iframe[title="reCAPTCHA"],
          iframe[style*="position: fixed; z-index: 2000000000;"],
          div[style*="z-index: 2147483647"],
          div[style*="z-index: 2000000000"],
          div[class*="g-recaptcha"],
          div[id^="rc-"],
          div[id^="grecaptcha-"],
          div[style*="width: 256px; height: 60px; position: fixed;"],
          .grecaptcha-logo, 
          .recaptcha-checkbox,
          .recaptcha-checkbox-border,
          [class*="g-recaptcha"],
          .g-recaptcha {
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            z-index: -9999 !important;
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: scale(0) !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
          }
          `
        }} />
      </head>
      <body className={`${inter.className} ${inter.variable}`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}