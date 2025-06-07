'use client';

import { useEffect } from 'react';
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

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}