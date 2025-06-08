'use client';

import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  // ページ遷移のためのフェードエフェクト
  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('fade-out');
    };
    
    const handleComplete = () => {
      document.body.classList.remove('fade-out');
      // ページ遷移時に先頭にスクロール
      window.scrollTo(0, 0);
    };

    // イベントリスナーの登録はクライアントサイドのみ
    if (typeof window !== 'undefined') {
      // Router events はサードパーティライブラリで実装が必要になりました
      // useEffect内で完結する単純なフェードイン効果に変更
      document.body.classList.add('fade-out');
      setTimeout(() => {
        document.body.classList.remove('fade-out');
      }, 10);
    }

    return () => {
      // クリーンアップ
      document.body.classList.remove('fade-out');
    };
  }, []);

  // reCAPTCHA v3のサイトキー
  const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </GoogleReCaptchaProvider>
  );
}