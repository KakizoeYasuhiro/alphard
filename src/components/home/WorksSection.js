'use client';

import Link from 'next/link';

export default function WorksSection() {
  return (
    <section className="works-section">
      <h2 className="section-heading en-text">WORKS</h2>
      
      <div className="works-buttons">
        <Link href="/works#artist-management" className="work-button en-text">ARTIST MANAGEMENT</Link>
        <Link href="/works#music-contents" className="work-button en-text">MUSIC & CONTENTS</Link>
        <Link href="/works#live-event" className="work-button en-text">LIVE & EVENT</Link>
        <Link href="/works#merchandising-fanclub" className="work-button en-text">MERCHANDISING & FANCLUB</Link>
        <Link href="/works#digital-solution" className="work-button en-text">DIGITAL SOLUTION</Link>
      </div>
      
      <div className="view-detail-link">
        <Link href="/works" className="animated-link en-text">&gt; VIEW DETAIL</Link>
      </div>
    </section>
  );
}