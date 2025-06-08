'use client'

import { useState, useEffect, useCallback } from 'react'

export default function useFetchData({
  endpoint,
  filters = {},
  limit = 6,
  normalizeItem = (contentItem) => contentItem
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  // データを取得する関数 - 内部関数として定義し、依存関係をなくす
  function fetchDataInternal(offset = 0, shouldAppend = false) {
    if (!endpoint) return;
    
    // ローディング状態を設定
    setIsLoading(true);

    // 非同期処理を開始
    fetch(`/api/${endpoint}?` + new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(filters.year ? { year: filters.year } : {}),
      ...(filters.month ? { month: filters.month } : {}),
      ...(filters.type && filters.type !== 'ALL' ? { type: filters.type } : {})
    }))
    .then(response => {
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.contents) {
        throw new Error('APIからのデータが不正です');
      }
      
      // トータル件数を設定
      setTotalCount(data.totalCount);
      
      // データを正規化
      const normalizedItems = data.contents.map(normalizeItem);
      
      // 既存のデータに追加するか、新しいデータで置き換えるか
      if (shouldAppend) {
        setItems(prev => [...prev, ...normalizedItems]);
      } else {
        setItems(normalizedItems);
      }
      
      // もう読み込むデータがない場合
      setHasMore(offset + normalizedItems.length < data.totalCount);
    })
    .catch(err => {
      setError(err.message || 'データの読み込み中に不明なエラーが発生しました。');
      if (!shouldAppend) {
        setItems([]);
      }
      setHasMore(false);
    })
    .finally(() => {
      // 初期ロード状態と読み込み状態を更新
      setInitialLoad(false);
      setIsLoading(false);
    });
  }

  // 次のページを取得する関数 - fetchDataInternalを使用
  const fetchNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextOffset = currentOffset + limit;
      setCurrentOffset(nextOffset);
      fetchDataInternal(nextOffset, true);
    }
  }, [currentOffset, limit, isLoading, hasMore, filters]);

  // 初期ロード時とフィルター変更時にデータを取得するuseEffect
  useEffect(() => {
    if (endpoint) {
      // 初期状態をリセット
      setItems([]);
      setCurrentOffset(0);
      setHasMore(true);
      setError(null);
      setInitialLoad(true);
      
      // データを取得 - 内部関数を直接呼び出し
      fetchDataInternal(0, false);
    }
  }, [endpoint, filters.year, filters.month, filters.type]);

  return {
    data: items,
    isLoading,
    initialLoad,
    error,
    hasMore,
    totalCount,
    fetchNextPage
  };
}