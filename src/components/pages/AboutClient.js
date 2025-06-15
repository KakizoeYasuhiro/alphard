'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/about.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutClient() {
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      const animElements = document.querySelectorAll('.about-content h2, .about-content p, .about-content img');
      
      animElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { 
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title ja-text">会社概要</h2>
          
          <div className="company-info">
            <div className="info-row">
              <div className="info-label ja-text">会社名</div>
              <div className="info-content ja-text">株式会社アルファルド</div>
            </div>
            
            <div className="info-row">
              <div className="info-label ja-text">代表者</div>
              <div className="info-content ja-text">代表取締役 柿添康大</div>
            </div>
            
            <div className="info-row">
              <div className="info-label ja-text">設立</div>
              <div className="info-content ja-text">2022（令和4）年4月1日</div>
            </div>
            
            <div className="info-row">
              <div className="info-label ja-text">事業内容</div>
              <div className="info-content business-list ja-text">
                <ul>
                  <li>所属アーティストのマネージメント</li>
                  <li>コンサート、イベント等の企画制作</li>
                  <li>グッズ企画・制作・販売</li>
                  <li>ファンクラブの運営</li>
                  <li>音楽原盤の制作及び販売</li>
                  <li>CD 及び音楽関連商品の販売</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}