'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { client } from '@/lib/microcms';

// ScrollTriggerプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewsSection() {
  // ニュースデータの状態
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // データ取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // フォールバックデータ
        const fallbackNews = [
          {
            id: 1,
            date: '2025.4.26',
            artist: '園木 邦宝',
            category: 'MEDIA',
            content: '4/26に開催される主催ワンマンライブ「WAVES vol.1」会場物販にて、アコースティックアルバム「TRAIL Disc I」の発売が決定。収録曲は全8曲。2年間にわたる弾き語りでの活動を集約...',
            imageUrl: '/images/trail1.png',
          },
          {
            id: 2,
            date: '2025.4.26',
            artist: '園木 邦宝',
            category: 'LIVE',
            content: '4/26、渋谷gee-ge.にて、主催ワンマンライブ「WAVES vol.1」の開催が決定。これまでの活動とは異なり、ピアノ、ドラムスを迎えたバンド編成でのワンマンライブは現形態では初。参加メンバーには元torchのピアニスト井上恭杜、...',
            imageUrl: '/images/WAVES1.png',
          }
        ];

        // クライアントサイドでAPIを直接呼び出す
        if (typeof window !== 'undefined') {
          try {
            const data = await client.get({
              endpoint: 'news',
              queries: { limit: 3, orders: '-date,order' },
            });
            
            if (data && data.contents && data.contents.length > 0) {
              const formattedNews = data.contents.map(item => ({
                id: item.id,
                date: new Date(item.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\//g, '.'),
                artist: Array.isArray(item.artist) && item.artist.length > 0 
                  ? item.artist[0] 
                  : item.artist || '',
                category: Array.isArray(item.category) && item.category.length > 0 
                  ? item.category[0].toUpperCase() 
                  : 'TOPIC',
                content: item.content,
                imageUrl: item.image?.url || null, // 明示的に null を設定
                url: item.URL || item.url || null // 明示的に null を設定
              }));
              
              setNewsItems(formattedNews);
              return;
            } else {
              // ホームページの場合はフォールバックデータを使用
              setNewsItems(fallbackNews);
              return;
            }
          } catch (apiError) {
            // ホームページの場合はエラー時もフォールバックデータを使用
            setNewsItems(fallbackNews);
            return;
          }
        }
        
        // ここまで到達した場合はフォールバックデータを使用
        setNewsItems(fallbackNews);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // アニメーション設定
  useEffect(() => {
    if (newsItems.length > 0 && !isLoading && typeof window !== 'undefined') {
      // スクロール可能なコンテナを取得
      const newsContainer = document.querySelector('.news-section .news-container');
      // ニュース項目を取得
      const newsItemsElements = document.querySelectorAll('.news-section .news-item');
      
      // 既存のトリガーをクリア
      const existingTriggers = ScrollTrigger.getAll();
      
      existingTriggers.forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger && 
            trigger.vars.trigger.classList && 
            trigger.vars.trigger.classList.contains('news-item')) {
          trigger.kill();
        }
      });

      // アニメーション設定
      newsItemsElements.forEach((item, index) => {
        // 初期状態を明示的に設定
        gsap.set(item, { 
          opacity: 0, 
          y: 20,
          visibility: 'visible' // 確実に表示状態に
        });
        
        // アニメーション設定 - スクローラーを指定
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            scroller: newsContainer, // ニュースコンテナ内のスクロールを監視
            start: 'top bottom-=50',
            end: 'bottom top+=50',
            toggleActions: 'play none none reverse',
            id: `news-item-${index}`
          }
        });
      });
      
      // VIEW MOREリンクのアニメーション - メインのスクロールを監視
      const viewMoreLink = document.querySelector('.news-section .view-more-link');
      if (viewMoreLink) {
        gsap.fromTo(
          viewMoreLink,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: viewMoreLink,
              start: 'top bottom-=50',
              toggleActions: 'play none none reverse',
              id: 'news-view-more'
            }
          }
        );
      }
    }
    
    // クリーンアップ関数
    return () => {
      if (typeof window !== 'undefined') {
        // ニュース関連のトリガーのみをクリア
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.id && 
              (trigger.vars.id.startsWith('news-item-') || trigger.vars.id === 'news-view-more')) {
            trigger.kill();
          }
        });
      }
    };
  }, [newsItems, isLoading]);

  return (
    <section className="news-section home-news-section">
      <h2 className="section-heading en-text">NEWS</h2>
      <div className="custom-hr-line"></div>
      
      <div className="news-container">
        {error && <p className="error-message">エラー: {error}</p>}
        {isLoading && <p className="loading-message">Loading...</p>}
        {!error && !isLoading && newsItems.length === 0 && (
          <p className="no-results-message">表示するニュースがありません。</p>
        )}
        {!isLoading && newsItems.map((item) => (
          <div className="news-item" key={item.id}>
            <div className="news-main">
              <div className="news-date-tags">
                <span className="news-date">{item.date}</span>
                <span className="news-artist">{item.artist}</span>
                <span className="news-type">{item.category}</span>
              </div>
              
              <div className="news-content" dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.url && (
                <div className="news-detail-link">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#7e9bef' }}>&gt; 詳細はこちら</a>
                </div>
              )}
            </div>
            
            {item.imageUrl ? (
              <div className="news-image">
                <Image 
                  src={item.imageUrl} 
                  alt={`${item.artist} - ${item.category}`}
                  width={200}
                  height={150}
                  sizes="(max-width: 768px) 100vw, 200px"
                  quality={75}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority={false}
                />
              </div>
            ) : (
              <div className="news-image-placeholder"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="custom-hr-line-bottom"></div>
      <div className="view-more-link">
        <Link href="/news" className="animated-link en-text">&gt; VIEW MORE</Link>
      </div>
    </section>
  );
}