// src/app/api/news/route.js
import { NextResponse } from 'next/server';
import { client } from '@/lib/microcms';

export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 6;
    const offset = parseInt(searchParams.get('offset')) || 0;
    
    // APIクエリを構築
    const queries = {
      limit: limit,
      offset: offset,
      orders: '-date,order'
    };
    
    // フィルターパラメータを追加
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const type = searchParams.get('type');
    
    // フィルター条件を配列で構築
    const filterConditions = [];
    
    // 年フィルター - 年だけの正確なフィルタリング（YYYY年のみのデータを対象）
    if (year) {
      // 年は完全一致ではなく、日付文字列に含まれるかを確認
      filterConditions.push(`date[contains]${year}`);
    }
    
    // 月フィルター - 月だけの正確なフィルタリング（MM月のみのデータを対象）
    if (month) {
      // 月は2桁になるよう調整
      const paddedMonth = month.padStart(2, '0');
      filterConditions.push(`date[contains]-${paddedMonth}-`);
    }
    
    // カテゴリーフィルター - containsを使用してカテゴリー配列内の一致を検索
    if (type && type !== 'ALL') {
      // MicroCMSでは小文字でカテゴリーが保存されているため、小文字に変換
      const typeValue = type.toLowerCase();
      filterConditions.push(`category[contains]${typeValue}`);
    }
    
    // 複数条件がある場合は[and]で連結
    if (filterConditions.length > 0) {
      queries.filters = filterConditions.join('[and]');
      console.log('API フィルター条件:', queries.filters);
    }
    
    // デバッグ: 完全なクエリーを表示
    console.log('完全なMicroCMS API クエリー:', queries);
    
    // 直接クライアントを使用
    let data;
    try {
      data = await client.get({
        endpoint: 'news',
        queries,
      });
      
      // 結果のデバッグ出力
      console.log(`API結果: ${data.totalCount}件のデータを取得`);
      if (data.contents && data.contents.length > 0) {
        console.log('最初の結果のカテゴリ:', data.contents[0].category);
      }
    } catch (apiError) {
      console.error('MicroCMS API Error:', apiError);
      data = { contents: [], totalCount: 0 };
    }
    
    // データがない場合は空の配列を返す
    if (!data || !data.contents) {
      data = { contents: [], totalCount: 0 };
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'ニュースリストの取得に失敗しました。',
        details: error.message
      },
      { status: 500 }
    );
  }
}