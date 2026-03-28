// src/app/api/news/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 6;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // フィルターパラメータを取得
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const type = searchParams.get('type');

    // Supabaseクエリを構築
    let query = supabase
      .from('news')
      .select('*', { count: 'exact' })
      .eq('site', 'alphard')
      .order('date', { ascending: false })
      .order('order', { ascending: true })
      .range(offset, offset + limit - 1);

    // 年フィルター
    if (year) {
      // dateカラムに年が含まれるかで絞り込み (例: "2025")
      query = query.like('date', `%${year}%`);
    }

    // 月フィルター
    if (month) {
      const paddedMonth = month.padStart(2, '0');
      // dateカラムに "-MM-" パターンが含まれるかで絞り込み
      query = query.like('date', `%-${paddedMonth}-%`);
    }

    // カテゴリーフィルター
    if (type && type !== 'ALL') {
      const typeValue = type.toLowerCase();
      // categoryカラムにカテゴリーが含まれるかで絞り込み
      query = query.like('category', `%${typeValue}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      // APIエラー時は空のデータを返す
      console.error('Supabase query error:', error);
      return NextResponse.json({ contents: [], totalCount: 0 });
    }

    // MicroCMSと同じレスポンス形式で返す
    return NextResponse.json({
      contents: data || [],
      totalCount: count || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'ニュースリストの取得に失敗しました。',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
