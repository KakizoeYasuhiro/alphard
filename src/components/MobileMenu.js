'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose }) {
  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // メニューが開いているときは背景スクロールを無効化
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose}></div>}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="close-menu" onClick={onClose}>×</div>
        <ul>
          <li><Link href="/" onClick={onClose}>HOME</Link></li>
          <li><Link href="/artists" onClick={onClose}>ARTISTS</Link></li>
          <li><Link href="/news" onClick={onClose}>NEWS</Link></li>
          <li><Link href="/works" onClick={onClose}>WORKS</Link></li>
          <li><Link href="/about" onClick={onClose}>ABOUT</Link></li>
          <li><Link href="/contact" onClick={onClose}>CONTACT</Link></li>
        </ul>
      </div>
    </>
  );
}