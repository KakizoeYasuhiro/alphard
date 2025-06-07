'use client';

import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Menu, Transition } from '@headlessui/react';
import '../../styles/news.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewsClient() {
  const [activeArtistFilter, setActiveArtistFilter] = useState('ALL');
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [activeMonthFilter, setActiveMonthFilter] = useState('ALL');
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

  // Filtered news items based on active filters
  const filteredNews = newsItems.filter(item => {
    const artistMatch = activeArtistFilter === 'ALL' || item.artist === activeArtistFilter;
    const typeMatch = activeTypeFilter === 'ALL' || item.type === activeTypeFilter;
    const monthMatch = activeMonthFilter === 'ALL' || item.date.includes(activeMonthFilter);
    return artistMatch && typeMatch && monthMatch;
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
      <div className="news-filter">
        <div className="filter-group">
          <div className="filter-label">ARTIST:</div>
          <Menu as="div" className="filter-dropdown">
            <Menu.Button className="filter-dropdown-button">
              {activeArtistFilter} 
              <svg 
                className="dropdown-arrow" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="filter-dropdown-items">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeArtistFilter === 'ALL' ? 'active' : ''}`}
                      onClick={() => setActiveArtistFilter('ALL')}
                    >
                      ALL
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeArtistFilter === '園木 邦宝' ? 'active' : ''}`}
                      onClick={() => setActiveArtistFilter('園木 邦宝')}
                    >
                      園木邦宝
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeArtistFilter === '井上恭杜' ? 'active' : ''}`}
                      onClick={() => setActiveArtistFilter('井上恭杜')}
                    >
                      井上恭杜
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        
        <div className="filter-group">
          <div className="filter-label">TYPE:</div>
          <Menu as="div" className="filter-dropdown">
            <Menu.Button className="filter-dropdown-button">
              {activeTypeFilter}
              <svg 
                className="dropdown-arrow" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="filter-dropdown-items">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeTypeFilter === 'ALL' ? 'active' : ''}`}
                      onClick={() => setActiveTypeFilter('ALL')}
                    >
                      ALL
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeTypeFilter === 'TOPICS' ? 'active' : ''}`}
                      onClick={() => setActiveTypeFilter('TOPICS')}
                    >
                      TOPICS
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeTypeFilter === 'LIVE' ? 'active' : ''}`}
                      onClick={() => setActiveTypeFilter('LIVE')}
                    >
                      LIVE
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active || activeTypeFilter === 'MEDIA' ? 'active' : ''}`}
                      onClick={() => setActiveTypeFilter('MEDIA')}
                    >
                      MEDIA
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="filter-group month-filter">
          <div className="filter-label">MONTH:</div>
          <div className="month-selector">
            <button 
              className={activeMonthFilter === 'ALL' ? 'month-button active' : 'month-button'}
              onClick={() => setActiveMonthFilter('ALL')}
            >
              ALL
            </button>
            <div className="year-group">
              <div className="year-label">2025</div>
              <div className="months-grid">
                <button 
                  className={activeMonthFilter === '2025.1' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.1')}
                >
                  1
                </button>
                <button 
                  className={activeMonthFilter === '2025.2' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.2')}
                >
                  2
                </button>
                <button 
                  className={activeMonthFilter === '2025.3' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.3')}
                >
                  3
                </button>
                <button 
                  className={activeMonthFilter === '2025.4' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.4')}
                >
                  4
                </button>
                <button 
                  className={activeMonthFilter === '2025.5' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.5')}
                >
                  5
                </button>
                <button 
                  className={activeMonthFilter === '2025.6' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.6')}
                >
                  6
                </button>
                <button 
                  className={activeMonthFilter === '2025.7' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.7')}
                >
                  7
                </button>
                <button 
                  className={activeMonthFilter === '2025.8' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.8')}
                >
                  8
                </button>
                <button 
                  className={activeMonthFilter === '2025.9' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.9')}
                >
                  9
                </button>
                <button 
                  className={activeMonthFilter === '2025.10' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.10')}
                >
                  10
                </button>
                <button 
                  className={activeMonthFilter === '2025.11' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.11')}
                >
                  11
                </button>
                <button 
                  className={activeMonthFilter === '2025.12' ? 'month-button active' : 'month-button'}
                  onClick={() => setActiveMonthFilter('2025.12')}
                >
                  12
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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