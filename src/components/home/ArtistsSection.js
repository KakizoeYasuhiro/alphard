'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const artists = [
  { href: "/artists/khore", src: "/images/Alp_Khore.png", alt: "Khore" },
  { href: "/artists/inoue-takato", src: "/images/Alp_Takato.png", alt: "井上 恭杜" }
];

export default function ArtistsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderReady, setIsSliderReady] = useState(false);
  const autoplayTimerRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const slideRefs = useRef([]);
  const wrapperRef = useRef(null);

  const slideCount = artists.length;
  const autoplayDelayMs = 5000;

  const calculateTransform = useCallback(() => {
    if (!wrapperRef.current || !slideRefs.current[activeSlide] || !sliderTrackRef.current) {
      return;
    }
    
    // 初回計算時のみトランジションを一時的に無効化し、ジャンプを防ぐ
    if (!isSliderReady) {
      sliderTrackRef.current.style.transition = 'none';
    }

    const wrapperWidth = wrapperRef.current.offsetWidth;
    const activeSlideElement = slideRefs.current[activeSlide];
    const slideWidth = activeSlideElement.offsetWidth;
    
    const offsetToCenter = (wrapperWidth / 2) - (slideWidth / 2);
    const activeSlideOffsetLeft = activeSlideElement.offsetLeft;
    const newTransformValue = offsetToCenter - activeSlideOffsetLeft;
    
    sliderTrackRef.current.style.transform = `translateX(${newTransformValue}px)`;

    // DOMの更新が反映された後にトランジションを戻し、表示を有効化
    setTimeout(() => {
      if (sliderTrackRef.current) {
        sliderTrackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease';
      }
      if (!isSliderReady) {
        setIsSliderReady(true);
      }
    }, 50); // わずかな遅延

  }, [activeSlide, isSliderReady]);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };
  
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(nextSlide, autoplayDelayMs);
  }, [nextSlide]);

  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  useEffect(() => {
    // 画像の読み込みが完了してから計算を開始するための対策
    const images = slideRefs.current.map(s => s?.querySelector('img')).filter(Boolean);
    const promises = images.map(img => !img.complete ? new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }) : Promise.resolve());

    Promise.all(promises).then(() => {
      calculateTransform();
    });

    window.addEventListener('resize', calculateTransform);
    return () => window.removeEventListener('resize', calculateTransform);
  }, [calculateTransform]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [startAutoplay]);

  return (
    <section className="artists-section">
      <h2 className="section-heading en-text">ARTISTS</h2>
      
      <div className="slider-container"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={startAutoplay}>
        
        <div className="slider-arrow prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="slider-wrapper" ref={wrapperRef}>
          <div 
            className={`slider-track ${isSliderReady ? 'slider-ready' : ''}`}
            ref={sliderTrackRef}
          >
            {artists.map((artist, index) => (
              <div 
                key={artist.alt} 
                className={`slide ${activeSlide === index ? 'active' : ''}`}
                ref={el => slideRefs.current[index] = el}
              >
                <Link href={artist.href}>
                  <Image 
                    src={artist.src} 
                    alt={artist.alt} 
                    width={400}
                    height={533}
                    className="slide-image"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority={index < 2} // 最初の2枚を優先読み込み
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="slider-arrow next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="slider-dots">
        {artists.map((_, index) => (
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