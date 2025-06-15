'use client';

import Link from 'next/link';

export default function WorksSection() {
  return (
    <section className="works-section">
      <h2 className="section-heading en-text">WORKS</h2>
      
      <div className="works-buttons">
        <Link href="/works#artist-management" className="work-button ja-text">アーティストマネジメント</Link>
        <Link href="/works#music-contents" className="work-button ja-text">音楽・コンテンツ制作</Link>
        <Link href="/works#live-event" className="work-button ja-text">ライブ・イベント</Link>
        <Link href="/works#merchandising-fanclub" className="work-button ja-text">グッズ制作・ファンクラブ</Link>
        <Link href="/works#digital-solution" className="work-button ja-text">デジタルソリューション</Link>
      </div>
      
      <div className="view-detail-link">
        <Link href="/works" className="animated-link en-text">&gt; VIEW DETAIL</Link>
      </div>
    </section>
  );
}