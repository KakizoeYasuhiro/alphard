'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/artists.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 動画カルーセルのデータ
const carouselVideos = [
  { id: 1, title: 'CRAWLER - 園木 邦宝', embedId: 'eUOAi8JAp0o' },
  { id: 2, title: 'Blank Space - 園木 邦宝', embedId: '_UL2zm5Qfo8' },
  { id: 3, title: 'Bend - 園木 邦宝', embedId: 'TogNwwOaGmY' },
  { id: 4, title: 'NEWDAWN - 園木 邦宝', embedId: 'O0wIkiSPj28' },
  { id: 5, title: 'ルミネセンス - 園木 邦宝', embedId: 'YDwUrmW8RvU' },
  { id: 6, title: '生活 - 園木 邦宝', embedId: 'p6VCohkQQGI' },
  { id: 7, title: 'Shelter - 園木 邦宝', embedId: 'KgJJ6CPip7g' },
  { id: 8, title: 'とおく - 園木 邦宝', embedId: 'MM-j5bBrEk4' },
];

export default function ArtistDetailClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  
  // ウィンドウサイズに応じて表示アイテム数を更新
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateVisibleItems = () => {
        if (window.innerWidth >= 992) {
          setVisibleItems(3);
        } else if (window.innerWidth >= 768) {
          setVisibleItems(2);
        } else {
          setVisibleItems(1);
        }
      };
      
      updateVisibleItems();
      window.addEventListener('resize', updateVisibleItems);
      return () => window.removeEventListener('resize', updateVisibleItems);
    }
  }, []);
  
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      const elements = [
        '.artist-profile-header', 
        '.artist-profile-image', 
        '.artist-social-links', 
        '.profile-section', 
        '.music-videos'
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

  // 次へボタンクリック
  const nextSlide = () => {
    setCurrentIndex(prev => {
      // 表示アイテム数に応じて、最後のスライドを超えないようにする
      const maxIndex = Math.max(0, carouselVideos.length - visibleItems);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  // 前へボタンクリック
  const prevSlide = () => {
    setCurrentIndex(prev => {
      // 表示アイテム数に応じて、最初のスライドより前に行かないようにする
      const maxIndex = Math.max(0, carouselVideos.length - visibleItems);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section className="artist-profile">
      <div className="artist-profile-header" style={{ gap: '12px' }}>
        <h1 className="artist-profile-name-ja ja-text">園木 邦宝</h1>
        <p className="artist-profile-name-en en-text" style={{ marginTop: '12px' }}>SONOKI KUNITAKA</p>
      </div>

      <div className="artist-profile-image">
        <Image 
          src="/images/top_sonoki.jpg" 
          alt="園木 邦宝"
          width={400}
          height={533}
        />
      </div>

      <div className="artist-social-links">
        <a href="https://x.com/k_sonoki" target="_blank" rel="noopener noreferrer">
          <Image src="/images/X_WTE.svg" alt="X" width={20} height={20} />
        </a>
        <a href="https://www.instagram.com/k_sonoki/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/INSTA_WTE.svg" alt="Instagram" width={20} height={20} />
        </a>
        <a href="https://www.tiktok.com/@k_sonoki" target="_blank" rel="noopener noreferrer">
          <Image src="/images/TIKTOK_WTE.svg" alt="TikTok" width={20} height={20} />
        </a>
        <a href="https://www.youtube.com/@heavenlysketches2687" target="_blank" rel="noopener noreferrer">
          <Image src="/images/YOUTUBE_WTE.svg" alt="YouTube" width={20} height={20} />
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

      <div className="music-videos">
        <h3 className="en-text">MUSIC VIDEOS</h3>
        <div className="carousel-container">
          <div className="carousel-track" style={{transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`}}>
            {carouselVideos.map((video) => (
              <div key={video.id} className="carousel-item">
                <div className="video-container">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.embedId}?si=ve-KST7DGSgeT0HG&rel=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-button prev" 
            onClick={prevSlide} 
            aria-label="前のスライド"
          >
            &lt;
          </button>
          <button 
            className="carousel-button next" 
            onClick={nextSlide} 
            aria-label="次のスライド"
          >
            &gt;
          </button>
          
          <div className="carousel-indicators">
            {Array.from({ length: Math.max(1, carouselVideos.length - visibleItems + 1) }).map((_, index) => (
              <div 
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`スライド ${index + 1}`}
                role="button"
                tabIndex="0"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="official-links">
        <a href="https://ksonoki.com" target="_blank" rel="noopener noreferrer" className="official-link">OFFICIAL SITE</a>
        <a href="#" className="official-link">FUNCLUB</a>
      </div>
    </section>
  );
}