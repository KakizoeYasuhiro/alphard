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
  { id: 1, title: '歌うということ - Khore', embedId: 'nZ-gV96fUjw' },
  { id: 2, title: 'Khore - Video', embedId: 'IuFFXzO11As' },
  { id: 3, title: 'Khore - Video', embedId: 'Yq4Yrth5nvc' },
  { id: 4, title: 'Khore - Video', embedId: 'EEu3cw7JJzE' },
];

export default function ArtistDetailClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 1;

  // Music Videosセクションの表示制御（後々Khore名義のMVで入れ替え可能にするため）
  const showMusicVideos = true;
  
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
      
      // Music Videosセクションが表示される場合のみアニメーション対象に追加
      if (showMusicVideos) {
        elements.push('.music-videos');
      }
      
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
  }, [showMusicVideos]);

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
        <h1 className="artist-profile-name-ja ja-text">Khore</h1>
        <p className="artist-profile-name-en en-text" style={{ marginTop: '12px' }}>コーレ</p>
      </div>

      <div className="artist-profile-image">
        <Image 
          src="/images/BIO_art.png" 
          alt="Khore"
          width={400}
          height={533}
        />
      </div>

      <div className="artist-social-links">
        <a href="https://x.com/khore_jp" target="_blank" rel="noopener noreferrer">
          <Image src="/images/X_WTE.svg" alt="X" width={20} height={20} />
        </a>
        <a href="https://www.instagram.com/khore_jp/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/INSTA_WTE.svg" alt="Instagram" width={20} height={20} />
        </a>
        <a href="https://www.youtube.com/@alphard_music" target="_blank" rel="noopener noreferrer">
          <Image src="/images/YOUTUBE_WTE.svg" alt="YouTube" width={20} height={20} />
        </a>
      </div>

      <div className="profile-section">
        <h3 className="en-text">PROFILE</h3>
        <div className="profile-text ja-text">
          <p>Khore (コーレ)</p>
          <p>ミュージシャン・シンガー。</p>
          <p>作詞・作曲、編曲、デザイン、および映像・衣装・ライブ等の演出に至るまで、クリエイティブ全般を自身で担当。</p>
          <p>昨年末より本格始動し、初のワンマン「WAVES vol.2(@下北沢ReG)」を12/21に開催。</p>
          <p>同時に1st mini Album『Profile(プロファイル)』と、収録曲(M5)「歌うということ」のMusic Videoを立て続けにリリースし、その世界観を強く示した。</p>
          <p>今年春頃からはシングルのリリースを順次予定し、同7月には2度目となるワンマン「WAVES vol.3(@渋谷CRAWL)」の開催も決定している。</p>
          <p>・2026.7 Khore ONEMAN SHOW「WAVES vol.3」@渋谷CRAWL<br />
          ・2026.2 「歌うということ」Music Videoをリリース<br />
          ・2025.12 Khore ONEMAN SHOW「WAVES vol.2」@下北沢ReG<br />
          ・2025.12 Khore 1st mini Album『Profile（プロファイル）』リリース<br />
          ・2025.12 アーティスト名を「Khore(コーレ)」へ改める<br />
          ・2025.7 音楽事務所「株式会社アルファルド」所属<br />
          ・2025.4-5 Acoustic Album「TRAIL Disc1」/「TRAIL Disc2」ライブ会場限定リリース(旧名義)<br />
          ・2025.4 園木邦宝(旧名義) Trio-Band-set ONEMAN SHOW「WAVES vol.1」@渋谷gee-ge.<br />
          ・2020-2023 ユニット"CASPER CAVE"のボーカリストとして活動<br />
          ・2016-2020 バンド"torch"のボーカリストとして活動</p>
        </div>
      </div>

      {/* Music Videosセクション - 後々Khore名義のMVで入れ替え可能にするため、コードは残して非表示に */}
      {showMusicVideos && (
      <div className="music-videos">
        <h3 className="en-text">VIDEO</h3>
        <div className="carousel-container">
          <div className={`carousel-track ${carouselVideos.length === 1 ? 'single-video' : ''}`} style={carouselVideos.length === 1 ? {} : {transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`}}>
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
          
          {carouselVideos.length > 1 && (
            <>
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
            </>
          )}
        </div>
      </div>
      )}

      <div className="official-links">
        <a href="https://khore.jp" target="_blank" rel="noopener noreferrer" className="official-link">OFFICIAL SITE</a>
      </div>
    </section>
  );
}