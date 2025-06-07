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
                <p>〒107-0052</p>
                <p>東京都港区赤坂 2-23-1 アークヒルズフロントタワー RoP 605 号室</p>
                <div className="map-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.3776177781664!2d139.7381422!3d35.670802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b84fb7df767%3A0xc0ff5beaa59f32ef!2z44Ki44O844Kv44OS44Or44K644OV44Ot44Oz44OI44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1707038333626!5m2!1sja!2sjp" 
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
              <div className="info-content ja-text">2025（令和7）年5月31日</div>
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
            
            <div className="info-row">
              <div className="info-label ja-text">関連会社</div>
              <div className="info-content ja-text">
                <ul className="related-companies">
                  <li>株式会社アルファルドパブリッシング</li>
                  <li>株式会社アルファルドデザインオフィス</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}