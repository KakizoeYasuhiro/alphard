'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    alert('お問い合わせありがとうございます。メッセージを受け付けました。');
    // Reset form
    setFormData({
      contactType: '',
      name: '',
      email: '',
      message: ''
    });
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
          >
            <option value="" disabled>選択してください</option>
            <option value="general">一般的なお問い合わせ</option>
            <option value="business">ビジネスのご相談</option>
            <option value="artist">アーティストへのお問い合わせ</option>
            <option value="media">メディア関係のお問い合わせ</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">お名前</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">お問い合わせ内容</label>
          <textarea 
            id="message" 
            name="message" 
            rows="8" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group recaptcha">
          <div className="recaptcha-placeholder">
            <p>reCAPTCHA</p>
            <p>縦横解像度: 300 x 74</p>
          </div>
        </div>

        <div className="form-group submit-group">
          <button type="submit" className="submit-button">送信する</button>
        </div>
      </form>
    </div>
  );
}