'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <Link href="/contact" className="contact-box">
        <span className="mail-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M2 8L12 13L22 8" stroke="white" strokeWidth="2"/>
          </svg>
        </span>
        <span className="contact-text">お問い合わせはこちら</span>
      </Link>
    </section>
  );
}