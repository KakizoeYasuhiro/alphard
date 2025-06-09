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
          <p>熊本県菊池市出身。</p>
          <p>ロックバンド・torch(2016-2020)、ユニット・CASPER CAVE(2020-2023)のボーカリストを経て、現在は自身のソロ名義である園木 邦宝(2023-)として活動。</p>
          <p>2023年より、都内近郊から地元・熊本に拠点を移し、ソロアーティストとして九州・東京都内で活動後、2025年より現在のキャリアを本格始動した。</p>
          <p>同年4月にはソロ初の、バンド形態でのワンマンライブ「WAVES vol.1」＠渋谷gee-ge.を開催し、無事成功を納めた。また、同12月にはフルバンドでのワンマンライブ「WAVES vol.2」＠下北沢ReGの開催と、初となる1st mini Albumのリリースも決定している。</p>
          <p>賞歴・出演歴など<br />
          ・オーディション「BORN TO 九州」グランプリ選出[torch]<br />
          ・F-X2019(Zepp福岡)、HAPPYJACK'19(熊本市民会館)など大型フェス出演[torch]<br />
          ・熊本震災に寄せた映像制作クラウドファンディング「プロジェクト灯」200万円（100%）達成<br />
          ・DisGOONie主催「舞台"From Three Sons of Mama Fratelli"〜枯れるやまぁ のたりのたりとまほろばよ あぁ 悲しかろ あぁ 咲かしたろ〜」主題歌&挿入歌 歌唱（Zeppブルーシアター六本木：現在閉館）</p>
        </div>
      </div>

    </section>
  );
}