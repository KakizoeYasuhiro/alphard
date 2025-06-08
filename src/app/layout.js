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

export const metadata = {
  title: 'Alphard Music',
  description: '音楽マネジメント事務所Alphard',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${garamond.className} ${garamond.variable}`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}