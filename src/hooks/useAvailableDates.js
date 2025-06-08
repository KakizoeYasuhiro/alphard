'use client';

import { useState, useEffect } from 'react';

/**
 * 利用可能な年月データを取得するカスタムフック
 * @returns {Object} 利用可能な年月データと状態
 */
export default function useAvailableDates() {
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAvailableDates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // datesOnlyフラグを付けて日付のみを取得
        const res = await fetch('/api/news?datesOnly=true');
        
        if (!res.ok) {
          throw new Error(`APIリクエストエラー: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data && data.contents && data.contents.length > 0) {
          // 日付データから年と月のセットを作成
          const years = new Set();
          const months = new Set();
          
          data.contents.forEach(item => {
            const date = new Date(item.date);
            years.add(date.getFullYear().toString());
            months.add((date.getMonth() + 1).toString());
          });
          
          // セットを配列に変換してソート
          setAvailableYears([...years].sort((a, b) => b - a)); // 年は降順
          setAvailableMonths([...months].sort((a, b) => a - b)); // 月は昇順
        } else {
          console.warn('No date content found:', data);
          setAvailableYears([]);
          setAvailableMonths([]);
        }
      } catch (error) {
        console.error('Failed to fetch available dates:', error);
        setError(error.message || '日付データの取得に失敗しました');
        setAvailableYears([]);
        setAvailableMonths([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAvailableDates();
  }, []); // マウント時に一度だけ実行
  
  return { availableYears, availableMonths, isLoading, error };
}