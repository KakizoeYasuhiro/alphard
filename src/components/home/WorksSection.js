'use client';

import Link from 'next/link';

export default function WorksSection() {
  return (
    <section className="works-section">
      <h2 className="section-heading en-text">WORKS</h2>
      
      <div className="works-buttons">
        <Link href="/works#artist-management" className="work-button ja-text">アーティスト・マネジメント</Link>
        <Link href="/works#music-production" className="work-button ja-text">音楽制作・作家マネジメント</Link>
        <Link href="/works#live-event" className="work-button ja-text">ライブ・イベント制作</Link>
        <Link href="/works#fanclub" className="work-button ja-text">ファンクラブ運営</Link>
        <Link href="/works#goods" className="work-button ja-text">グッズ制作・デザイン</Link>
        <Link href="/works#publishing" className="work-button ja-text">音楽出版・出版代行</Link>
      </div>
      
      <div className="view-detail-link">
        <Link href="/works" className="animated-link en-text">&gt; VIEW DETAIL</Link>
      </div>
    </section>
  );
}