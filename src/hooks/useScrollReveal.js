'use client'

import { useEffect } from 'react'

/**
 * スクロール連動のアニメーション効果を適用するカスタムフック
 * reveal-on-scrollクラスを持つ要素が画面内に入ったときに、
 * revealedクラスを追加して表示するアニメーションを実行する
 * 
 * @param {Object} options - IntersectionObserverのオプション
 * @param {string} options.targetSelector - 対象となる要素のセレクタ（デフォルト: '.reveal-on-scroll'）
 * @param {number} options.threshold - 要素がどれだけ見えたらアニメーションを実行するか（0〜1、デフォルト: 0.1）
 * @param {string} options.revealedClass - 表示状態のクラス名（デフォルト: 'revealed'）
 */
export default function useScrollReveal({
  targetSelector = '.reveal-on-scroll',
  threshold = 0.1,
  revealedClass = 'revealed',
} = {}) {
  useEffect(() => {
    const revealElements = () => {
      // IntersectionObserverの設定
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
              // アニメーションを実行するためのクラスを追加
              entry.target.classList.add(revealedClass)
              // 一度表示した要素は監視をやめる
              observer.unobserve(entry.target)
            }
          })
        },
        {
          root: null, // ビューポートを基準に判定
          threshold: threshold, // 要素がこの割合だけ見えたらコールバックを実行
          rootMargin: '0px 0px -50px 0px', // 下部に少しマージンを設定（少し早めに表示）
        }
      )

      // 対象となる要素を監視対象に追加
      const elements = document.querySelectorAll(targetSelector)
      elements.forEach((el) => {
        observer.observe(el)
      })

      // クリーンアップ関数
      return () => {
        elements.forEach((el) => {
          observer.unobserve(el)
        })
      }
    }

    // DOMの読み込みが完了したらrevealElementsを実行
    if (document.readyState === 'complete') {
      revealElements()
    } else {
      window.addEventListener('load', revealElements)
      return () => {
        window.removeEventListener('load', revealElements)
      }
    }
  }, [targetSelector, threshold, revealedClass])
}