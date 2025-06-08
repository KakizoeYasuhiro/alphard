import NewsClient from '@/components/pages/NewsClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Alphard - NEWS',
  description: 'Latest news from Alphard and artists',
};

// サーバーコンポーネントのローディングフォールバック
function NewsLoading() {
  return (
    <div className="news-page" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '70px 20px', 
      color: 'white' 
    }}>
      <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<NewsLoading />}>
      <NewsClient />
    </Suspense>
  );
}