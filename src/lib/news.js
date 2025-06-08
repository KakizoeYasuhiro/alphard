// src/lib/news.js
import { client } from './microcms';

// ニュース一覧を取得
export const getNewsList = async (queries = {}) => {
  const data = await client.get({
    endpoint: 'news',
    queries,
  });
  return data;
};

// ニュース詳細を取得
export const getNewsDetail = async (contentId, queries = {}) => {
  const data = await client.getListDetail({
    endpoint: 'news',
    contentId,
    queries,
  });
  return data;
};