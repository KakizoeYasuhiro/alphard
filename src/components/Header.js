'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // スクロール対応のヘッダースタイル
  const [scrolled, setScrolled] = useState(false);

  // スクロール対応のハンドラー
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // パスに基づいてアクティブなリンクを判定
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header id="HEADER" className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link href="/">
          <Image 
            src="/images/Alphard_logo_wte.svg" 
            alt="Alphard Logo" 
            width={180} 
            height={50} 
            style={{
              maxWidth: '50vw',
              height: 'auto',
              display: 'block'
            }}
            priority
          />
        </Link>
      </div>
      <nav className="desktop-menu">
        <ul>
          <li><Link href="/" className={isActive('/') ? 'active' : ''}>HOME</Link></li>
          <li><Link href="/artists" className={isActive('/artists') ? 'active' : ''}>ARTISTS</Link></li>
          {/* NEWS link temporarily hidden 
          <li><Link href="/news" className={isActive('/news') ? 'active' : ''}>NEWS</Link></li>
          */}
          <li><Link href="/works" className={isActive('/works') ? 'active' : ''}>WORKS</Link></li>
          <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>ABOUT</Link></li>
          <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>CONTACT</Link></li>
        </ul>
      </nav>
      <div 
        className="hamburger-menu" 
        onClick={() => setMobileMenuOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
}