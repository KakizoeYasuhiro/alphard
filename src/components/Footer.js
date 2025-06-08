'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <Link href="/">
              <Image 
                src="/images/Alphard_logo_wte.svg" 
                alt="Alphard Logo" 
                width={180} 
                height={50} 
                style={{ height: 'auto', display: 'block' }}
              />
            </Link>
          </div>
          <div className="footer-nav">
            <ul>
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/artists">ARTISTS</Link></li>
              <li><Link href="/news">NEWS</Link></li>
              <li><Link href="/works">WORKS</Link></li>
              <li><Link href="/about">ABOUT</Link></li>
              <li><Link href="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-artist-info">
            <p className="artist-label">弊社所属アーティスト</p>
            <p className="fanclub-label">公式ウェブサイト</p>
            <div className="artist-logo">
              <a href="https://ksonoki.com" target="_blank" rel="noopener noreferrer">
                <Image 
                  src="/images/KS_LOGO_WTE.svg" 
                  alt="園木 邦宝" 
                  width={150} 
                  height={42} 
                  className="ks-logo-img"
                  style={{ height: 'auto', maxHeight: '50px' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p>Copyright ©{new Date().getFullYear()} Alphard All Right Reserved.</p>
      </div>
    </footer>
  );
}