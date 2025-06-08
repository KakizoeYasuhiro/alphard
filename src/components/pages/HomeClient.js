'use client';

import { useEffect } from 'react';
import ArtistsSection from '@/components/home/ArtistsSection';
import NewsSection from '@/components/home/NewsSection';
import WorksSection from '@/components/home/WorksSection';
import ContactSection from '@/components/home/ContactSection';

// アニメーション
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/home.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeClient() {
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ScrollTriggerをクリア
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        
        // セクションの初期状態を設定
        gsap.set(section, { 
          opacity: 0, 
          y: 50 
        });
        
        // スクロールトリガーアニメーションを設定
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%', // より早くトリガーされるように調整
            end: 'bottom 10%',
            toggleActions: 'play none none none',
          }
        });
      });
    }
    
    // クリーンアップ関数
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  return (
    <>
      <ArtistsSection />
      <NewsSection />
      <WorksSection />
      <ContactSection />
    </>
  );
}