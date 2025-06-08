'use client';

import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  // ページ遷移のためのフェードエフェクト
  useEffect(() => {
    // イベントリスナーの登録はクライアントサイドのみ
    if (typeof window !== 'undefined') {
      // useEffect内で完結する単純なフェードイン効果
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
      container={{
        parameters: {
          badge: 'inline', // reCAPTCHAバッジを非表示（インラインモードに変更）
        }
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </GoogleReCaptchaProvider>
  );
}