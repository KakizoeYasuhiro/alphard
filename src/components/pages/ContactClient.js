'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import '../../styles/contact.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactClient() {
  const [formData, setFormData] = useState({
    contactType: '',
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [selectedTopicMessage, setSelectedTopicMessage] = useState('');
  
  // reCAPTCHAフック
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // reCAPTCHAが利用可能かどうかを監視
  const [recaptchaAvailable, setRecaptchaAvailable] = useState(false);
  
  // reCAPTCHAの準備ができたら状態を更新
  useEffect(() => {
    if (executeRecaptcha) {
      setRecaptchaAvailable(true);
    }
  }, [executeRecaptcha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'contactType') {
      let message = '';
      switch (value) {
        case '所属アーティストのライブについて':
          message = (
            <>
              ・各ライブチケットの購入・予約方法につきましては、該当ページをご確認いただき、そちらに記載のない場合や、TIGET・プレイガイドでの取り扱いがない場合、当フォームにてお問い合わせください。<br />
              ・チケットの払い戻しにつきましては、原則として対応しておりません。あらかじめご了承ください。(公演中止・延期の場合の対応は別途ご案内いたします。)<br />
              ・チケット紛失・盗難時の対応につきましては、当問い合わせフォームまでご連絡ください。(ご購入を証明できるものをご準備いただけますと、対応がスムーズに進む場合がございます。)<br />
              ・入場に関するルールや会場内での禁止事項については、各公演のアーティストSNSでの告知、またはTIGET・プレイガイドの案内をご参照ください。<br />
              ・車椅子でのご来場や特別なサポートが必要な場合は、お手数ですが事前に当問い合わせフォームまでご連絡ください。(公演日の1週間前までにご連絡いただけますと、よりスムーズなご案内が可能です。)
            </>
          );
          break;
        case 'グッズ販売について':
          message = (
            <>
              ・商品の在庫状況や入荷予定につきましては、当フォームよりお気軽にお問い合わせください。<br />
              ・商品の予約・取り置きの可否や方法につきましては、商品によって異なりますので、当フォームにてお問い合わせください。<br />
              ・商品の直接のご購入・発送手続きは、当フォームでは受け付けておりません。あらかじめご了承ください。(ご購入は指定のオンラインストアやライブ会場にてお願いいたします。)<br />
              ・お客様のご都合による返品・交換・返金は原則として受け付けておりません。万が一、お届けした商品に初期不良(破損・汚損など)がございましたら、当フォームよりご連絡ください。
            </>
          );
          break;
        case '所属アーティストについて':
          message = (
            <>
              ・ファンレター・プレゼントの送付先は現在公開しておりません。ライブ会場等での受け渡し方法についてご不明な場合は事前に当フォームよりお問い合わせください。<br />
              ・公式に発表されている情報以外のプライベートに関するご質問には、回答できない場合がございます。あらかじめご了承ください。
            </>
          );
          break;
        case '出演・取材依頼について':
          message = (
            <>
              ・ご依頼につきましては、当問い合わせフォームよりご連絡ください。その際、可能な範囲でアーティスト名、企画内容、媒体名、ご希望日時、ご予算等の詳細をご記載いただけますと幸いです。<br />
              ・ご依頼内容やスケジュール等により、お受けできない場合もございますことをあらかじめご了承ください。
            </>
          );
          break;
        case '楽曲使用について':
          message = (
            <>
              ・所属アーティストの楽曲のご利用に関するお問い合わせは、当フォームにて直接受け付けております。<br />
              お問い合わせの際は、下記について可能な範囲で具体的にお知らせください。<br />
              　。ご希望の楽曲名<br />
              　。ご使用目的（例：個人のSNS投稿でのBGM、結婚式での利用、イベントでのBGM、映像作品での使用、カバー演奏の公開など）<br />
              　。ご使用媒体（例：YouTube、Instagram、自主制作CD、イベント会場名など）<br />
              　。ご使用期間（もしあれば）<br />
              　。ご利用規模（例：個人の範囲、学校行事、小規模イベント、商用利用など）<br />
              ・個人の方が非営利目的で、所属アーティストの楽曲をカバー演奏・歌唱・ダンスなどで使用し、SNS等にその動画や音声を投稿される場合は、出典（アーティスト名・曲名）を必ず明記してください。可能であれば、事前に当フォームよりご一報いただけますと幸いです。<br />
              ・商用利用（広告、商品化、有料イベント、放送など）や法人でのご利用をご希望の場合は、必ず事前に当フォームより詳細な企画内容と共にご相談ください。使用料や条件等について個別にご案内させていただきます。<br />
              ・楽曲のイメージを著しく損なうような利用、公序良俗に反する利用、または当方が不適切と判断した利用については、許諾できない場合がございます。あらかじめご了承ください。<br />
              ・ご相談内容の確認や許諾の判断には、お時間をいただく場合がございます。
            </>
          );
          break;
        case 'その他':
          message = 'お問い合わせ内容をできるだけ具体的にご記載いただけますと、より確認しやすく、よりスムーズなご案内につながります。';
          break;
        default: // 「選択して下さい」の場合
          message = '';
          break;
      }
      setSelectedTopicMessage(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // reCAPTCHAが利用可能かどうかをチェック
    if (!recaptchaAvailable || !executeRecaptcha) {
      setSubmitStatus({
        type: 'error',
        message: 'reCAPTCHAの準備ができていません。少し待ってからもう一度お試しください。'
      });
      return;
    }

    // クライアント側の入力値検証
    const clientValidationErrors = [];
    
    if (!formData.contactType) {
      clientValidationErrors.push('お問い合わせ内容を選択してください。');
    }
    
    if (!formData.name || formData.name.trim().length < 1 || formData.name.length > 100) {
      clientValidationErrors.push('お名前は1文字以上100文字以内で入力してください。');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length > 254) {
      clientValidationErrors.push('有効なメールアドレスを入力してください。');
    }
    
    if (!formData.message || formData.message.trim().length < 10 || formData.message.length > 5000) {
      clientValidationErrors.push('お問い合わせ内容は10文字以上5000文字以内で入力してください。');
    }

    // 危険なパターンの検出
    const dangerousPatterns = [
      /<[^>]*>/g, // HTMLタグ
      /javascript:/gi, // JavaScriptプロトコル
      /data:/gi, // データURL
      /vbscript:/gi, // VBScript
      /on\w+\s*=/gi, // イベントハンドラー
    ];

    const allFormText = Object.values(formData).join(' ');
    for (const pattern of dangerousPatterns) {
      if (pattern.test(allFormText)) {
        clientValidationErrors.push('入力内容に使用できない文字が含まれています。');
        break;
      }
    }

    if (clientValidationErrors.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: clientValidationErrors.join(' ')
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // レート制限のローカルチェック（UX改善用）
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
      if (timeSinceLastSubmission < 60000) { // 1分以内
        setSubmitStatus({
          type: 'error',
          message: 'しばらく経ってから再度お試しください。'
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // reCAPTCHAトークンを取得
      const recaptchaToken = await executeRecaptcha('submit_contact_form');
      
      // トークンをフォームデータに追加
      const dataWithToken = {
        ...formData,
        recaptchaToken
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithToken),
      });

      const result = await response.json();

      if (response.ok) {
        // 成功時の処理
        localStorage.setItem('lastContactSubmission', Date.now().toString());
        
        setSubmitStatus({
          type: 'success',
          message: result.message || 'お問い合わせありがとうございます。メッセージを受け付けました。'
        });
        
        // フォームをリセット
        setFormData({
          contactType: '',
          name: '',
          email: '',
          message: ''
        });
        setSelectedTopicMessage('');
      } else {
        // エラー時の処理（レート制限の場合は特別処理）
        if (response.status === 429) {
          setSubmitStatus({
            type: 'error',
            message: result.error || '送信回数が制限を超えました。しばらく経ってから再度お試しください。'
          });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'エラーが発生しました。もう一度お試しください。'
        });
        }
      }
    } catch (error) {
      // ネットワークエラーの詳細判定
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitStatus({
          type: 'error',
          message: 'インターネット接続を確認してください。'
        });
      } else {
      setSubmitStatus({
        type: 'error',
        message: 'ネットワークエラーが発生しました。しばらく経ってから再度お試しください。'
      });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Form animation
    gsap.fromTo(
      '.contact-title',
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    gsap.fromTo(
      '.form-group',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="contact-container">
      <h1 className="contact-title">お問い合わせ</h1>

      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contactType">お問い合わせ内容</label>
          <select 
            id="contactType" 
            name="contactType" 
            value={formData.contactType}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          >
            <option value="">選択して下さい</option>
            <option value="所属アーティストのライブについて">所属アーティストのライブについて</option>
            <option value="グッズ販売について">グッズ販売について</option>
            <option value="所属アーティストについて">所属アーティストについて</option>
            <option value="出演・取材依頼について">出演・取材依頼について</option>
            <option value="楽曲使用について">楽曲使用について</option>
            <option value="その他">その他</option>
          </select>
          {selectedTopicMessage && (
            <div className="topic-info-message">
              {selectedTopicMessage}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">お名前 <span className="required">*</span></label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            disabled={isSubmitting}
            maxLength="100"
            minLength="1"
            autoComplete="name"
            placeholder="お名前をご入力ください"
          />
          <div className="field-info">
            {formData.name.length}/100文字
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス <span className="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            disabled={isSubmitting}
            maxLength="254"
            autoComplete="email"
            placeholder="example@domain.com"
          />
          <div className="field-info">
            返信に使用いたします
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">お問い合わせ内容 <span className="required">*</span></label>
          <textarea 
            id="message" 
            name="message" 
            rows="8" 
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            maxLength="5000"
            minLength="10"
            placeholder="お問い合わせ内容を具体的にご記載ください（10文字以上）"
          ></textarea>
          <div className="field-info">
            {formData.message.length}/5000文字（最低10文字）
          </div>
        </div>
        
        <div className="recaptcha-terms">
          This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy </a>
          and
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"> Terms of Service </a>
          apply.
        </div>

        <div className="form-group submit-group">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting || !recaptchaAvailable}
            title={!recaptchaAvailable ? 'reCAPTCHAの準備ができるまでお待ちください' : ''}
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>
        </div>
      </form>
    </div>
  );
}