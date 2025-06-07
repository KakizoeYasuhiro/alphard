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
      // セクションのフェードインアニメーション
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
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