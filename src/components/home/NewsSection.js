'use client';

import Link from 'next/link';
import Image from 'next/image';

// 仮のニュースデータ (本番ではAPIなどから取得)
const newsItems = [
  {
    id: 1,
    date: '2025.4.26',
    artist: '園木 邦宝',
    type: 'MEDIA',
    content: [
      '4/26に開催される主催ワンマンライブ「WAVES vol.1」会場物販にて、アコースティックアルバム「TRAIL Disc I」の発売が決定。',
      '収録曲は全8曲。2年間にわたる弾き語りでの活動を集約...'
    ],
    image: '/images/trail1.png',
    imageAlt: 'TRAIL Disc I'
  },
  {
    id: 2,
    date: '2025.4.26',
    artist: '園木 邦宝',
    type: 'LIVE',
    content: [
      '4/26、渋谷gee-ge.にて、主催ワンマンライブ「WAVES vol.1」の開催が決定。これまでの活動とは異なり、ピアノ、ドラムスを迎えたバンド編成でのワンマンライブは現形態では初。参加メンバーには元torchのピアニスト井上恭杜、...'
    ],
    image: '/images/WAVES1.png',
    imageAlt: 'WAVES vol.1'
  }
];

export default function NewsSection() {
  return (
    <section className="news-section">
      <h2 className="section-heading en-text">NEWS</h2>
      
      <div className="news-list">
        {newsItems.map((item) => (
          <div className="news-item" key={item.id}>
            <div className="news-main">
              <div className="news-date-tags">
                <span className="news-date">{item.date}</span>
                <span className="news-artist">{item.artist}</span>
                <span className="news-type">{item.type}</span>
              </div>
              
              <div className="news-content">
                {item.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="news-image">
              <Image 
                src={item.image} 
                alt={item.imageAlt}
                width={200}
                height={150}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="view-more-link">
        <Link href="/news" className="animated-link en-text">&gt; VIEW MORE</Link>
      </div>
    </section>
  );
}