'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ContactGuide from '@/components/ContactGuide';
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
    if (submitStatus.type === 'success') setSubmitStatus({ type: '', message: '' });
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contactType">お問い合わせの種類</label>
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
          <ContactGuide topic={formData.contactType} />
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
          />
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
          <label htmlFor="message">本文 <span className="required">*</span></label>
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
            aria-describedby="message-length"
          ></textarea>
          <div className="field-info" id="message-length">
            {formData.message.length > 4500 ? `${formData.message.length} / 5000文字` : '10〜5000文字'}
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
        {submitStatus.message && (
          <div role={submitStatus.type === 'error' ? 'alert' : 'status'} className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
}