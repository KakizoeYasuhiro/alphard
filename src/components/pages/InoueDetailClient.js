'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/artists.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InoueDetailClient() {
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      const elements = [
        '.artist-profile-header', 
        '.artist-profile-image', 
        '.artist-social-links', 
        '.profile-section'
      ];
      
      elements.forEach((selector, index) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            delay: 0.1 * index,
            ease: 'power2.out'
          }
        );
      });
    }
  }, []);

  return (
    <section className="artist-profile">
      <div className="artist-profile-header" style={{ gap: '12px' }}>
        <h1 className="artist-profile-name-ja ja-text">井上 恭杜</h1>
        <p className="artist-profile-name-en en-text" style={{ marginTop: '12px' }}>INOUE TAKATO</p>
      </div>

      <div className="artist-profile-image">
        <Image 
          src="/images/top_takato.jpg" 
          alt="井上 恭杜"
          width={400}
          height={533}
        />
      </div>

      <div className="artist-social-links">
        <a href="https://x.com/takaton0526" target="_blank" rel="noopener noreferrer">
          <Image src="/images/X_WTE.svg" alt="X" width={20} height={20} />
        </a>
        <a href="https://www.instagram.com/takatoinoue_insta/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/INSTA_WTE.svg" alt="Instagram" width={20} height={20} />
        </a>
      </div>

      <div className="profile-section">
        <h3 className="en-text">PROFILE</h3>
        <div className="profile-text ja-text">
          <p>熊本県玉名市出身。</p>
          <p>洗足音楽大学・ロックアンドポップス科主席(2020年卒業)。</p>
          <p>ロックバンド・torch(2016-2020)、ユニット・CASPER CAVE(2020-2023)のキーボーディストとして活動後、現在は園木 邦宝(2023-)バンドに参加しつつ、ソロピアニストとしても活動。</p>
          <p>様々なジャンル・音色に精通しつつ、クラシックをベースにした流麗なプレイを得意とする。</p>
          <p>WORKS・賞歴・出演歴など<br />
          ・オーディション「BORN TO 九州」グランプリ選出[torch]<br />
          ・F-X2019(Zepp福岡)、HAPPYJACK'19(熊本市民会館)など大型フェス出演[torch]<br />
          ・熊本震災に寄せた映像制作クラウドファンディング「プロジェクト灯」200万円（100%）達成</p>
        </div>
      </div>

    </section>
  );
}