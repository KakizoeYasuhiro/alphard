'use client';

import { useState, memo, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FilterControls from '@/components/FilterControls';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetchData from '@/hooks/useFetchData';
import useAnimations from '@/hooks/useAnimations';
import useScrollReveal from '@/hooks/useScrollReveal';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import '../../styles/news.css';

// クライアントサイドのみでGSAPプラグインを登録
if (typeof window !== 'undefined') {
  try {
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  } catch (error) {
    // ScrollTriggerプラグインの登録に失敗した場合は静かに失敗
  }
}

// ニュース項目のメモ化コンポーネント
const NewsItem = memo(({ item }) => (
  <div className="news-item reveal-on-scroll" key={item.id}>
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
));

// フィルターコントロールのコンポーネントを分離
const NewsFilters = memo(({ filters, onFilterChange }) => {
  // 利用可能な年と月 - メモ化により再レンダリングを防止
  const availableYears = ['2025'];
  const availableMonths = ['4', '5'];
  
  return (
    <FilterControls 
      filters={filters} 
      onFilterChange={onFilterChange}
      availableYears={availableYears}
      availableMonths={availableMonths}
      typeOptions={['ALL', 'TOPIC', 'LIVE', 'MEDIA']}
      isNewsPage={true}
    />
  );
});

// データの正規化関数を外部に分離
const normalizeNewsItem = (item) => ({
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
  imageUrl: item.image?.url || null,
  url: item.URL || item.url || null
});

// ニュースリストコンポーネントを分離
const NewsList = memo(({ newsItems, hasMore, fetchNextPage }) => {
  return (
    <InfiniteScroll
      dataLength={newsItems.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={<div className="loading-indicator"></div>}
      endMessage={<div className="end-message"></div>}
      className="news-list"
      style={{ overflow: 'visible' }}
      scrollThreshold={0.1}
    >
      {newsItems.map(item => <NewsItem key={item.id} item={item} />)}
    </InfiniteScroll>
  );
});

export default function NewsClient() {
  // フィルター状態
  const [filters, setFilters] = useState({
    year: null,
    month: null,
    type: 'ALL'
  });

  // アニメーションフックを使用
  const { setupNewsItemAnimations } = useAnimations();
  useScrollReveal();

  // データ取得カスタムフック
  const {
    data: newsItems,
    isLoading,
    initialLoad,
    error,
    hasMore,
    fetchNextPage
  } = useFetchData({
    endpoint: 'news',
    filters,
    limit: 6,
    normalizeItem: normalizeNewsItem
  });

  // フィルター変更ハンドラー
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);
  
  // データが変更されたときにアニメーションを設定
  useEffect(() => {
    if (newsItems.length > 0 && !isLoading) {
      // 少し遅延させてDOMが更新された後にアニメーションを設定
      const timer = setTimeout(() => {
        setupNewsItemAnimations();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [newsItems, isLoading, setupNewsItemAnimations]);

  return (
    <AnimatedWrapper>
      <section className="news-page">
        <NewsFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
        />

        {error && <p className="error-message">エラー: {error}</p>}

        {newsItems.length > 0 ? (
          <NewsList 
            newsItems={newsItems}
            hasMore={hasMore}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <div className="loading-initial"></div>
        )}
      </section>
    </AnimatedWrapper>
  );
}