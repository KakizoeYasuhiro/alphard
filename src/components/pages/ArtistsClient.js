'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/artists.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArtistsClient() {
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      const artistItems = document.querySelectorAll('.artist-item');
      
      artistItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, []);

  return (
    <section className="artists-section">
      <h1 className="en-text">ARTISTS</h1>
      <div className="artists-container">
        <div className="artist-item">
          <Link href="/artists/khore" className="artist-link">
            <div className="artist-image">
              <Image 
                src="/images/Khore_art.png" 
                alt="Khore" 
                width={300}
                height={300}
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
            <div className="artist-name">
              <h2 className="artist-name-ja ja-text" style={{marginBottom: 0}}>Khore</h2>
              <p className="artist-name-en en-text">コーレ</p>
            </div>
          </Link>
        </div>
        <div className="artist-item">
          <Link href="/artists/inoue-takato" className="artist-link">
            <div className="artist-image">
              <Image 
                src="/images/top_takato.jpg" 
                alt="井上 恭杜" 
                width={300}
                height={300}
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
            <div className="artist-name">
              <h2 className="artist-name-ja ja-text" style={{marginBottom: 0}}>井上 恭杜</h2>
              <p className="artist-name-en en-text">Inoue Takato</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}