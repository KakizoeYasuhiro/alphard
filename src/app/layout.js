import { EB_Garamond } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

// フォントの設定
const garamond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-garamond',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${garamond.className} ${garamond.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}