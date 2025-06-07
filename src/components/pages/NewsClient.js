'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FilterControls from '@/components/FilterControls';
import '../../styles/news.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewsClient() {
  const [filters, setFilters] = useState({
    year: '2025',
    month: null,
    type: 'ALL'
  });
  const [activePage, setActivePage] = useState(1);

  // Sample news data - in a real app, this would come from an API
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
      image: '/images/works_publishing.png',
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
      image: '/images/works_WAVES1.png',
      imageAlt: 'WAVES vol.1'
    },
    {
      id: 3,
      date: '2025.4.26',
      artist: '園木 邦宝',
      type: 'MEDIA',
      content: [
        '4/26に開催される主催ワンマンライブ「WAVES vol.1」会場物販にて、アコースティックアルバム「TRAIL Disc I」の発売が決定。',
        '収録曲は全8曲。2年間にわたる弾き語りでの活動を集約...'
      ],
      image: '/images/works_publishing.png',
      imageAlt: 'TRAIL Disc I'
    },
    {
      id: 4,
      date: '2025.4.26',
      artist: '園木 邦宝',
      type: 'LIVE',
      content: [
        '4/26、渋谷gee-ge.にて、主催ワンマンライブ「WAVES vol.1」の開催が決定。これまでの活動とは異なり、ピアノ、ドラムスを迎えたバンド編成でのワンマンライブは現形態では初。参加メンバーには元torchのピアニスト井上恭杜、...'
      ],
      image: '/images/works_WAVES1.png',
      imageAlt: 'WAVES vol.1'
    }
  ];

  // フィルター変更ハンドラー
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filtered news items based on active filters
  const filteredNews = newsItems.filter(item => {
    const typeMatch = filters.type === 'ALL' || item.type === filters.type;
    const monthMatch = !filters.month || item.date.includes(`2025.${filters.month}`);
    return typeMatch && monthMatch;
  });

  useEffect(() => {
    // Scroll animations
    const newsItems = document.querySelectorAll('.news-item');
    
    gsap.fromTo(
      newsItems,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.news-list',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredNews]); // Re-run when filtered news changes

  return (
    <section className="news-page">
      <FilterControls 
        filters={filters} 
        onFilterChange={handleFilterChange}
        availableYears={['2025']}
        availableMonths={['4', '5']}
        typeOptions={['ALL', 'TOPICS', 'LIVE', 'MEDIA']}
        isNewsPage={true}
      />

      <div className="news-list">
        {filteredNews.map(item => (
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

      <div className="pagination">
        <a 
          href="#" 
          className={activePage === 1 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(1);
          }}
        >
          1
        </a>
        <a 
          href="#" 
          className={activePage === 2 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(2);
          }}
        >
          2
        </a>
        <a 
          href="#" 
          className={activePage === 3 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(3);
          }}
        >
          3
        </a>
        <a 
          href="#" 
          className={activePage === 4 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(4);
          }}
        >
          4
        </a>
        <a 
          href="#" 
          className={activePage === 5 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(5);
          }}
        >
          5
        </a>
        <span className="pagination-dots">...</span>
        <a 
          href="#" 
          className={activePage === 10 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(10);
          }}
        >
          10
        </a>
        <a href="#" className="pagination-next" onClick={(e) => {
          e.preventDefault();
          if (activePage < 10) {
            setActivePage(activePage + 1);
          }
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}