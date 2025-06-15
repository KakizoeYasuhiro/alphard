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
      {/* ARTIST MANAGEMENT */}
      <section id="artist-management" className="work-section">
        <h2 className="work-title">ARTIST MANAGEMENT</h2>
        <div className="work-content">
          <p>アーティスト、タレントのマネージメント、プロモート業務をはじめ、新人アーティストの発掘、育成など、エンターテインメントを包括的にプロデュースする事業を展開しています。</p>
        </div>
      </section>

      {/* MUSIC & CONTENTS */}
      <section id="music-contents" className="work-section">
        <h2 className="work-title">MUSIC & CONTENTS</h2>
        <div className="work-content">
          <p>音楽、映像、出版物等の企画、制作、販売のほか、音楽配信や著作権・原盤権の管理など、コンテンツ制作に関わる幅広い業務を行います。</p>
        </div>
      </section>

      {/* LIVE & EVENT */}
      <section id="live-event" className="work-section">
        <h2 className="work-title">LIVE & EVENT</h2>
        <div className="work-content">
          <p>コンサート、イベントの企画、制作、運営を行います。</p>
          <p>アイディア力と豊富な経験で、話題性、集客力のあるライブやイベントの実現を目指します。</p>
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

      {/* MERCHANDISING & FANCLUB */}
      <section id="merchandising-fanclub" className="work-section">
        <h2 className="work-title">MERCHANDISING & FANCLUB</h2>
        <div className="work-content">
          <p>アーティスト関連商品の企画、製造、販売と公式ファンクラブの企画、運営を行います。ファンの特性に合わせたイベントや会員サイトのデジタルコンテンツサービス、ライブ会場でのブース運営、新規会員の獲得などファンクラブ運営に関する業務をトータルで行います。</p>
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
          <div className="goods-gallery">
            <div className="gallery-row">
              <Image 
                src="/images/works_goods.png" 
                alt="グッズ" 
                width={600} 
                height={400}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px', marginTop: '20px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL SOLUTION */}
      <section id="digital-solution" className="work-section">
        <h2 className="work-title">DIGITAL SOLUTION</h2>
        <div className="work-content">
          <p>ウェブサイト・SNSの企画運営、デジタルプロモーションの実施や、インターネットメディアの活用、マーケティング事業を行います。また、所属アーティストの肖像権や著作権、原盤権、出版権を含む音源、映像作品等の権利の保護・管理も行います。</p>
        </div>
      </section>
    </div>
  );
}