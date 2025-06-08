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
  metadataBase: new URL('https://alphard.info'),
  title: 'Alphard Music',
  description: '音楽マネジメント事務所Alphard',
  icons: {
    icon: '/favicon.ico',
  },
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
      <body className={`${garamond.className} ${garamond.variable}`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}