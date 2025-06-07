'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  {
    id: 1,
    title: 'CRAWLER - 園木 邦宝',
    embedId: 'eUOAi8JAp0o',
  },
  {
    id: 2,
    title: 'Blank Space - 園木 邦宝',
    embedId: '_UL2zm5Qfo8',
  },
  {
    id: 3,
    title: 'Bend - 園木 邦宝',
    embedId: 'TogNwwOaGmY',
  },
  {
    id: 4,
    title: 'NEWDAWN - 園木 邦宝',
    embedId: 'O0wIkiSPj28',
  },
  {
    id: 5,
    title: 'ルミネセンス - 園木 邦宝',
    embedId: 'YDwUrmW8RvU',
  },
  {
    id: 6,
    title: '生活 - 園木 邦宝',
    embedId: 'p6VCohkQQGI',
  },
  {
    id: 7,
    title: 'Shelter - 園木 邦宝',
    embedId: 'KgJJ6CPip7g',
  },
  {
    id: 8,
    title: 'とおく - 園木 邦宝',
    embedId: 'MM-j5bBrEk4',
  },
];

export default function ArtistDetailClient() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      gsap.fromTo(
        '.artist-profile-header',
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        }
      );
      
      gsap.fromTo(
        '.artist-profile-image',
        { 
          opacity: 0,
          scale: 0.95
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out'
        }
      );
      
      gsap.fromTo(
        '.artist-social-links',
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out'
        }
      );
      
      gsap.fromTo(
        '.profile-section',
        { 
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power2.out'
        }
      );
      
      gsap.fromTo(
        '.music-videos',
        { 
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.5,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  // カルーセルの次のスライドへ移動
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === carouselVideos.length - 1 ? 0 : prev + 1));
  };

  // カルーセルの前のスライドへ移動
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselVideos.length - 1 : prev - 1));
  };

  // ドットクリックでスライド切り替え
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="artist-profile">
      <div className="artist-profile-header">
        <h1 className="artist-profile-name-ja ja-text">園木 邦宝</h1>
        <p className="artist-profile-name-en en-text">SONOKI KUNITAKA</p>
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
          <Image 
            src="/images/X_WTE.svg" 
            alt="X" 
            width={30}
            height={30}
          />
        </a>
        <a href="https://www.instagram.com/k_sonoki/" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/images/INSTA_WTE.svg" 
            alt="Instagram" 
            width={30}
            height={30}
          />
        </a>
        <a href="https://www.tiktok.com/@k_sonoki" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/images/TIKTOK_WTE.svg" 
            alt="TikTok" 
            width={30}
            height={30}
          />
        </a>
        <a href="https://www.youtube.com/@heavenlysketches2687" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/images/YOUTUBE_WTE.svg" 
            alt="YouTube" 
            width={30}
            height={30}
          />
        </a>
      </div>

      <div className="profile-section">
        <h3 className="en-text">PROFILE</h3>
        <div className="profile-text ja-text">
          <p>園木 邦宝/Sonoki Kunitaka 。熊本県菊池市出身・在住。</p>
          <p>torch(2016-2020)、CASPER CAVE(2020-2023)、園木 邦宝(2023-)として活動。</p>
          <p>都内を拠点に活動していた前身バンド・torchでは、熊本震災の復興へ向けた映像プロジェクトや寄金活動など、故郷のための働きかけも行う。</p>
          <p>オーディション「BORN TO 九州」でグランプリ選出、F-X2019(Zepp 福岡)やHAPPYJACK'19(熊本市民会館)などの大型フェスへも出演。</p>
          <p>2023年〜、拠点を東京都内から地元である熊本に移し、ソロアーティストとして九州、東京都内にて精力的に活動中。</p>
          <p>2025年には初となるバンド形態でのワンマンライブ「WAVES vol.1」@渋谷gee-ge.を開催。同年末にはフルバンドでのワンマンライブ「WAVES vol.2」@下北沢REGの開催も決定している。</p>
        </div>
      </div>

      <div className="music-videos">
        <h3 className="en-text">MUSIC VIDEOS</h3>
        <div className="carousel-container">
          <div 
            className="carousel-track" 
            ref={carouselRef}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {carouselVideos.map((video, index) => (
              <div 
                key={video.id} 
                className={`carousel-item ${index === activeSlide ? 'active' : ''}`}
              >
                <div className="video-container">
                  <iframe 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${video.embedId}`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button prev" onClick={prevSlide}>&lt;</button>
          <button className="carousel-button next" onClick={nextSlide}>&gt;</button>
        </div>
        
        <div className="carousel-indicators">
          {carouselVideos.map((_, index) => (
            <span 
              key={index}
              className={`carousel-indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="official-links">
        <a href="#" className="official-link">OFFICIAL SITE</a>
        <a href="#" className="official-link">FUNCLUB</a>
      </div>
    </section>
  );
}