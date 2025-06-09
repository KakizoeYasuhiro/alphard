'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ArtistsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(2);
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const autoplayDelayMs = 5000; // 5秒ごとに自動スライド

  // スライダーの初期化と自動再生
  useEffect(() => {
    if (sliderRef.current) {
      // スライド数を取得
      const slides = sliderRef.current.querySelectorAll('.slide');
      setSlideCount(slides.length);
    }

    // 自動再生の開始
    startAutoplay();

    return () => {
      // コンポーネントがアンマウントされたときにタイマーをクリア
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // 自動再生の開始
  const startAutoplay = () => {
    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, autoplayDelayMs);
  };

  // 自動再生の一時停止
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  // 自動再生の再開
  const resumeAutoplay = () => {
    if (!autoplayTimerRef.current) {
      startAutoplay();
    }
  };

  // 次のスライドへ
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  // 前のスライドへ
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  // ドットクリックでスライド切り替え
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="artists-section">
      <h2 className="section-heading en-text">ARTISTS</h2>
      
      <div className="slider-container"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}>
        <div className="slider-arrow prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="slider-wrapper">
          <div className="slider-track" ref={sliderRef}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            <div className={`slide ${activeSlide === 0 ? 'active' : ''}`}>
              <Image 
                src="/images/top_sonoki.jpg" 
                alt="園木 邦宝" 
                width={400}
                height={533}
                className="slide-image"
              />
            </div>
            <div className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
              <Image 
                src="/images/top_sonoki.jpg" 
                alt="園木 邦宝" 
                width={400}
                height={533}
                className="slide-image"
              />
            </div>
          </div>
        </div>
        
        <div className="slider-arrow next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="slider-dots">
        {[...Array(slideCount)].map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}