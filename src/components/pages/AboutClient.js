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
              <div className="info-label ja-text">所在地</div>
              <div className="info-content ja-text">
                <p>〒213-0002</p>
                <p>神奈川県川崎市高津区二子2-5-14-102</p>
                <div className="map-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.747836628691!2d139.61110707483635!3d35.60946818013196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f4f3506d0df1%3A0xee1467d03ab95564!2z44CSMjEzLTAwMDIg56We5aWI5bed55yM5bed5bSO5biC6auY5rSl5Yy65LqM5a2QMi01LTE0!5e0!3m2!1sja!2sjp!4v1717946911345!5m2!1sja!2sjp" 
                    width="600" 
                    height="450" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
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