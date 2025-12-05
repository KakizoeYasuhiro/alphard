'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '../../styles/artists.css';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InoueDetailClient() {
  // スクロールアニメーションの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 要素のフェードインアニメーション
      const elements = [
        '.artist-profile-header', 
        '.artist-profile-image', 
        '.artist-social-links', 
        '.profile-section'
      ];
      
      elements.forEach((selector, index) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            delay: 0.1 * index,
            ease: 'power2.out'
          }
        );
      });
    }
  }, []);

  return (
    <section className="artist-profile">
      <div className="artist-profile-header" style={{ gap: '12px' }}>
        <h1 className="artist-profile-name-ja ja-text">井上 恭杜</h1>
        <p className="artist-profile-name-en en-text" style={{ marginTop: '12px' }}>INOUE TAKATO</p>
      </div>

      <div className="artist-profile-image">
        <Image 
          src="/images/Tinoue.png" 
          alt="井上 恭杜"
          width={400}
          height={533}
        />
      </div>

      <div className="artist-social-links">
        <a href="https://x.com/takaton0526" target="_blank" rel="noopener noreferrer">
          <Image src="/images/X_WTE.svg" alt="X" width={20} height={20} />
        </a>
        <a href="https://www.instagram.com/takatoinoue_insta/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/INSTA_WTE.svg" alt="Instagram" width={20} height={20} />
        </a>
      </div>

      <div className="profile-section">
        <h3 className="en-text">PROFILE</h3>
        <div className="profile-text ja-text">
          <div className="profile-section-content">
            <p>Pianist / Keyboardist</p>
            <p>熊本県玉名出身。</p>
            <p>4歳からYAMAHA音楽教室に通い、ピアノ・エレクトーンに触れる。</p>
            <p>地元高校を卒業後、上京。</p>
            <p>洗足学園音楽大学・ロックアンドポップス科に進学し、川村ケン氏(キーボード)、明石昌夫氏(編曲・Mix)に師事し、2020年卒業。</p>
            <p>ミュージシャンとしては、ロックバンド・torch、ユニット・CASPER CAVEのキーボーディストとして活動後、現在はKhoreバンドに正規メンバーとして参加しつつ、ソロアーティストとしての活動も開始。</p>
            <p>クラシックを基礎にした流麗なプレイを得意としつつ、様々なジャンル・音色に精通。</p>
            <p>楽器演奏だけでなく、作編曲はもちろん、レコーディングやミックスなどのエンジニアリングも自ら行う。</p>
          </div>

          <p className="section-title">□メンバー参加</p>
          <p>・torch(キーボーディスト:2016−2020)</p>
          <p>・CASPER CAVE(キーボーディスト・編曲者・エンジニア:2020−2023)</p>
          <p>・Khore(キーボーディスト・編曲者・エンジニア:2025-)</p>
          
          <p className="section-title">□作品参加(敬称略・順不同)</p>
          <p>・わかざえもん『泥泥』(編曲・キーボード)、『針山ダンシング』(編曲・キーボード)、『正夢』(編曲・ミックス)</p>
          <p>・monochrome『PRISM』(キーボード)</p>
          <p>・卯ノ花クダシ『萌ゆる生命、枯れる花』(ピアノ)</p>
          <p>・さのめいみ『約束』 (編曲・キーボード)</p>
          <p>※torch,CASPER CAVE,Khoreを除く</p>
          
          <p className="section-title">□ライブサポート(敬称略・順不同)</p>
          <p>Amber's/番匠谷紗衣/monochrome/nory/nero/わかざえもん</p>
          
          <p className="section-title">□賞歴・出演歴など</p>
          <p>・ELECTONE FESTIVAL 2018 アンサンブルコンテスト 九州地区ファイナル　金賞</p>
          <p>・洗足学園音楽大学　ロック&ポップス科　首席卒業</p>
          <p>・オーディション「BORN TO 九州」グランプリ選出[torch]</p>
          <p>・F-X2019(Zepp福岡)、HAPPYJACK'19(熊本市民会館)など大型フェス出演[torch]</p>
          <p>・熊本震災に寄せた映像制作クラウドファンディング「プロジェクト灯」200万円（100%）達成</p>
        </div>
      </div>

    </section>
  );
}