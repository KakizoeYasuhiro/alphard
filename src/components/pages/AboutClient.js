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
              <div className="info-label ja-text">設立年月日</div>
              <div className="info-content ja-text">2022年4月1日（2025年6月16日 商号変更・現在の事業開始）</div>
            </div>
            
            <div className="info-row">
              <div className="info-label ja-text">事業内容</div>
              <div className="info-content business-list ja-text">
                <ul>
                  <li><strong>アーティストマネジメント</strong><br />
                  アーティスト、タレントのマネジメント、プロモーション業務<br />
                  新人アーティストの発掘、育成</li>
                  
                  <li><strong>音楽・コンテンツ制作</strong><br />
                  楽曲やミュージックビデオ、ライブ映像、出版物（CD・写真集など）等の企画・制作・販売<br />
                  音楽配信、著作権・原盤権の管理</li>
                  
                  <li><strong>ライブ・イベント</strong><br />
                  コンサート、イベントの企画・制作・運営</li>
                  
                  <li><strong>グッズ制作・ファンクラブ</strong><br />
                  アーティスト関連商品の企画・製造・販売<br />
                  公式ファンクラブの企画・運営</li>
                  
                  <li><strong>デジタルソリューション</strong><br />
                  ウェブサイト・SNSの企画運営、デジタルプロモーション<br />
                  インターネットメディアの活用、マーケティング事業</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}