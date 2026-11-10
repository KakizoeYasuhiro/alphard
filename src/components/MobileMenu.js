'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose }) {
  const closeButton = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    closeButton.current?.focus();
    const onKeyDown = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose}></div>}
      <div id="mobile-navigation" aria-hidden={!isOpen} className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button ref={closeButton} type="button" className="close-menu" aria-label="メニューを閉じる" onClick={onClose}>×</button>
        <ul>
          <li><Link href="/" onClick={onClose}>HOME</Link></li>
          <li><Link href="/artists" onClick={onClose}>ARTISTS</Link></li>
          {/* NEWS link temporarily hidden 
          <li><Link href="/news" onClick={onClose}>NEWS</Link></li>
          */}
          <li><Link href="/works" onClick={onClose}>WORKS</Link></li>
          <li><Link href="/about" onClick={onClose}>ABOUT</Link></li>
          <li><Link href="/contact" onClick={onClose}>CONTACT</Link></li>
        </ul>
      </div>
    </>
  );
}