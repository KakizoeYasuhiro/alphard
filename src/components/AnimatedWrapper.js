'use client'

import { useEffect, useRef } from 'react'

/**
 * スクロールアニメーションを自動適用するラッパーコンポーネント
 * reveal-on-scrollクラスを持つ要素に対して、画面内に入ったときに
 * revealedクラスを追加するIntersectionObserverを設定します
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - ラップする子要素
 * @param {Object} props.options - IntersectionObserverのオプション
 * @param {number} props.options.threshold - 要素がどれだけ見えたらアニメーションを実行するか（0〜1）
 * @param {string} props.options.revealedClass - 表示状態を示すクラス名
 * @returns {JSX.Element}
 */
export default function AnimatedWrapper({ 
  children,
  options = {
    threshold: 0.1,
    revealedClass: 'revealed',
  }
}) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return;
    
    // IntersectionObserverの設定
    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
              // アニメーションを実行するためのクラスを追加
              entry.target.classList.add(options.revealedClass)
              // 一度表示した要素は監視をやめる
              observer.unobserve(entry.target)
            }
          })
        },
        {
          root: null, // ビューポートを基準に判定
          threshold: options.threshold, // 要素がこの割合だけ見えたらコールバックを実行
          rootMargin: '0px 0px -50px 0px', // 下部に少しマージンを設定（少し早めに表示）
        }
      );
    } catch (error) {
      // IntersectionObserverの作成に失敗した場合は処理を中断
      return;
    }

    // レンダリング完了後に実行 (遅延処理を追加)
    const setupObserver = () => {
      if (!wrapperRef.current) return;

      // 少し遅延させてDOMが確実に更新された後に実行
      setTimeout(() => {
        try {
          // 対象となる要素を監視対象に追加
          const elements = wrapperRef.current.querySelectorAll('.reveal-on-scroll');
          if (elements.length > 0) {
            elements.forEach((el) => {
              try {
                observer.observe(el);
              } catch (e) {
                // 要素の監視に失敗した場合は無視
              }
            });
          }
        } catch (error) {
          // セットアップ中にエラーが発生した場合は無視
        }
      }, 100);
    };

    // DOMの読み込みが完了したら実行
    const runSetup = () => {
      if (document.readyState === 'complete') {
        setupObserver();
      } else {
        // setTimeout で実行することでhydrationが完了してからセットアップする
        setTimeout(setupObserver, 200);
      }
    };
    
    // すぐに実行を試みつつ、load イベントも監視
    runSetup();
    window.addEventListener('load', setupObserver);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('load', setupObserver);
      if (observer) {
        try {
          if (wrapperRef.current) {
            const elements = wrapperRef.current.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el) => {
              try {
                observer.unobserve(el);
              } catch (e) {
                // すでに切断されている可能性があるので、エラーは無視
              }
            });
          }
          observer.disconnect();
        } catch (error) {
          // クリーンアップ時のエラーは無視
        }
      }
    }
  }, [options.threshold, options.revealedClass])

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  )
}