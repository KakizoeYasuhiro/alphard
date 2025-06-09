'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/works.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorksClient() {
  useEffect(() => {
    // Scroll animations
    const workSections = document.querySelectorAll('.work-section');
    
    gsap.fromTo(
      workSections,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.works-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Add additional animations for specific elements
    gsap.fromTo(
      '.work-title',
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.works-container',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="works-container">
      {/* アーティスト・マネジメント */}
      <section className="work-section">
        <h2 className="work-title">アーティスト・マネジメント</h2>
        <div className="work-content">
          <p>所属アーティストのマネージメント、楽曲制作・プロデュースをはじめ、音楽を中心としたオリジナルコンテンツの制作とレーベル運営や、イベントの企画/制作/運営を中心とした、エンターテインメントを包括的にプロデュースする事業を展開しています。</p>
        </div>
      </section>

      {/* 音楽制作・作家マネジメント */}
      <section className="work-section">
        <h2 className="work-title">音楽制作・作家マネジメント</h2>
        <div className="work-content">
          <p>アーティスト以外の音楽クリエイターのマネージメント・業務提携の他、アーティストやCM、ドラマ・映画の劇伴などの作曲・編曲、楽曲プロデュースなど、音楽制作事業を行います。</p>
        </div>
      </section>

      {/* ライブ・イベント制作 */}
      <section className="work-section">
        <h2 className="work-title">ライブ・イベント制作</h2>
        <div className="work-content">
          <p>自社アーティストを中心としたライブイベントを制作。</p>
          <p>アイディアカと豊富な経験で、結朧性、集客力のあるライブやイベントの制作、運営を行います。</p>
        </div>
      </section>

      {/* 企画・制作イベント実績 */}
      <section className="work-section event-showcase">
        <h3 className="work-subtitle">企画・制作イベント実績</h3>
        <div className="event-content">
          <div className="event-details">
            <p>「WAVES vol.1」@ 渋谷gee-ge.（写真参照）</p>
            <p>「WAVES vol.2」@ 下北沢ReG</p>
            <p>その他</p>
            <p>ナンバリングイベント「SCENE」</p>
            <p>2マンツアー「SMOKE」など</p>
          </div>
          <div className="event-image">
            <Image 
              src="/images/works_WAVES1.png" 
              alt="WAVES vol.1" 
              width={400} 
              height={300}
              style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
            />
          </div>
        </div>
      </section>

      {/* ファンクラブ運営 */}
      <section className="work-section">
        <h2 className="work-title">ファンクラブ運営</h2>
        <div className="work-content">
          <p>ファンの特性に合わせたファンイベントや時代に合わせた会員サイトのデジタルコンテンツサービス企画・制作・管理、ライブ会場でのブース運営、新規会員の獲得などファンクラブ運営に関する業務をトータルで行います。</p>
          <div className="fanclub-logo">
            <div className="fanclub-dolphin-hotel">
              <div style={{ width: '450px', height: '120px' }}>
                <Image 
                  src="/images/DOLPHINHOTEL.svg" 
                  alt="DÖLPHIN ! HOTEL - 園木邦宝 Official Fanclub" 
                  width={450} 
                  height={120}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* グッズ制作・デザイン */}
      <section className="work-section">
        <h2 className="work-title">グッズ制作・デザイン</h2>
        <div className="work-content">
          <p>グッズやロゴをはじめとしたアーティスト活動に関わるデザイン・企画・製作・販売を行います。</p>
          <div className="goods-gallery">
            <div className="gallery-row">
              <Image 
                src="/images/works_goods.png" 
                alt="グッズ" 
                width={600} 
                height={400}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 音楽出版・出版代行 */}
      <section className="work-section">
        <h2 className="work-title">音楽出版・出版代行</h2>
        <div className="work-content">
          <p>所属アーティストの肖像権や著作権、原盤権、出版権を含む音源、映像作品等の権利の保護・管理も行います。</p>
          <div className="publishing-diagram">
            <Image 
              src="/images/works_publishing.png" 
              alt="Publishing Diagram" 
              width={600} 
              height={400}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}