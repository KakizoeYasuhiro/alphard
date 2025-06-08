'use client'

import { useState, useEffect } from 'react'

/**
 * ニュースデータを取得するカスタムフック
 * @param {Object} options - オプションオブジェクト
 * @param {number} options.limit - 取得する記事数の上限（デフォルト: 5）
 * @param {string|null} options.year - フィルタリングする年（オプション）
 * @param {string|null} options.month - フィルタリングする月（オプション）
 * @param {string} options.category - フィルタリングするカテゴリ（オプション）
 * @param {string} options.artist - フィルタリングするアーティスト（オプション）
 * @returns {Object} ニュースデータと状態
 */
export default function useNewsData({ limit = 5, year = null, month = null, category = null, artist = null, page = 1 } = {}) {
  const [newsItems, setNewsItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // クエリパラメータを構築
        const queryParams = new URLSearchParams()
        if (limit) queryParams.append('limit', String(limit))
        if (year) queryParams.append('year', year)
        if (month) queryParams.append('month', String(month))
        if (category && category !== 'ALL') queryParams.append('category', category)
        if (artist) queryParams.append('artist', artist)
        if (page > 1) queryParams.append('page', String(page))
        
        // APIリクエストを実行
        const url = `/api/news?${queryParams.toString()}`
        console.log('🔍 Fetching from:', url);
        
        const res = await fetch(url)
        
        if (!res.ok) {
          const errorData = await res.json();
          console.error('❌ API Error:', errorData);
          throw new Error(`APIリクエストエラー: ${res.status} - ${errorData.details || errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json()
        console.log('✅ API Response:', data ? `${data.totalCount} items` : 'No data');

        if (data && data.contents) {
          const newsData = data.contents.map(item => ({
            id: item.id,
            date: new Date(item.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\//g, '.'),
            category: Array.isArray(item.category) && item.category.length > 0 
              ? item.category[0].toUpperCase() 
              : 'TOPIC',
            artist: Array.isArray(item.artist) && item.artist.length > 0
              ? item.artist[0]
              : item.artist || '',
            title: item.title || '',
            content: item.content || '',
            imageUrl: item.image?.url,
            url: item.URL || item.url
          }))
          
          setNewsItems(page > 1 ? [...newsItems, ...newsData] : newsData)
        } else {
          console.warn('⚠️ No content found or data is in unexpected format:', data)
          if (page === 1) {
            setNewsItems([])
          }
        }
      } catch (error) {
        console.error('❌ Failed to fetch news:', error)
        setError(error.message || 'ニュースの取得に失敗しました')
        if (page === 1) {
          setNewsItems([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [limit, year, month, category, artist, page]) // 依存配列にパラメータを入れることで値が変わったら再取得

  return { newsItems, isLoading, error }
}