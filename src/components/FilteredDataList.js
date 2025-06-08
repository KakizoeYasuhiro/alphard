'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// ScrollTriggerプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FilteredDataList({ 
  dataItems, 
  isLoading, 
  error, 
  onLoadMore, 
  hasMoreData = false
}) {
  // アニメーション用のステート
  const [animatedItems, setAnimatedItems] = useState([]);

  // データが変更されたら、アニメーション対象アイテムをリセット
  useEffect(() => {
    if (dataItems.length > 0) {
      setAnimatedItems(dataItems);
    }
  }, [dataItems]);

  // アニメーション設定
  useEffect(() => {
    if (animatedItems.length > 0) {
      // アニメーション対象要素を取得
      const itemElements = document.querySelectorAll('.filtered-data-list .news-item');
      
      // 既存のトリガーをクリア
      ScrollTrigger.getAll().forEach(trigger => {
        if (itemElements && Array.from(itemElements).some(item => item === trigger.trigger)) {
          trigger.kill();
        }
      });

      // 新しいアイテムにアニメーションを設定
      itemElements.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.1,
            onComplete: () => {
              // アニメーション完了後に無限スクロールのトリガーを設定
              if (index === itemElements.length - 1 && hasMoreData) {
                setupInfiniteScroll();
              }
            }
          }
        );
      });
    }
    
    // クリーンアップ関数
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animatedItems, hasMoreData]);

  // 無限スクロール用のトリガーを設定
  const setupInfiniteScroll = () => {
    if (hasMoreData && typeof onLoadMore === 'function') {
      const lastItem = document.querySelector('.filtered-data-list .news-item:last-child');
      if (lastItem) {
        ScrollTrigger.create({
          trigger: lastItem,
          start: 'bottom bottom-=150',
          onEnter: () => {
            onLoadMore();
          },
          once: true
        });
      }
    }
  };

  return (
    <div className="filtered-data-list">
      {error && <p className="error-message">エラー: {error}</p>}
      
      {isLoading && dataItems.length === 0 && (
        <p className="loading-message">Loading...</p>
      )}
      
      {!error && !isLoading && dataItems.length === 0 && (
        <p className="no-results-message">表示するデータがありません。</p>
      )}
      
      {dataItems.map(item => (
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
                <a href={item.url} target="_blank" rel="noopener noreferrer">&gt; 詳細はこちら</a>
              </div>
            )}
          </div>
          
          {item.imageUrl && (
            <div className="news-image">
              <Image 
                src={item.imageUrl} 
                alt={`${item.artist} - ${item.category}`}
                width={200}
                height={150}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>
      ))}
      
      {isLoading && dataItems.length > 0 && (
        <p className="loading-more-message">読み込み中...</p>
      )}
    </div>
  );
}