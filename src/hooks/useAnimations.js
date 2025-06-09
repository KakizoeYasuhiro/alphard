'use client'

import { useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// ScrollTriggerプラグインを登録（サーバーサイドでエラーにならないように条件付きで実行）
if (typeof window !== 'undefined') {
  // すでに登録済みかチェック
  if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (error) {
      // ScrollTriggerの登録に失敗した場合は無視
    }
  }
}

export default function useAnimations() {
  // ニュースアイテムのアニメーション設定
  const setupNewsItemAnimations = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // ScrollTriggerが登録されていることを確認
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (error) {
        // エラー時は処理を中断
        return;
      }
    }
    
    // 既存のトリガーをクリーンアップ
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id?.includes('news-item-anim')) {
        trigger.kill();
      }
    });
    
    // ニュースアイテムを取得
    const newsItems = document.querySelectorAll('.news-item');
    if (newsItems.length === 0) return;
    
    // 初期状態設定 - 一旦非表示に
    gsap.set(newsItems, { opacity: 0, y: 50 });
    
    // 各ニュースアイテムにアニメーション適用
    newsItems.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.1, // アイテムごとに遅延を設定
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
          once: true,
          id: `news-item-anim-${i}-${Date.now()}`
        }
      });
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 遅延を設定してDOM更新後に実行
      const timer = setTimeout(() => {
        setupNewsItemAnimations();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        // ニュースアイテムのトリガーをクリーンアップ
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id?.includes('news-item-anim')) {
              trigger.kill();
            }
          });
        }
      };
    }
  }, [setupNewsItemAnimations]);

  return {
    setupNewsItemAnimations
  };
}