// 入力値検証とサニタイゼーションユーティリティ

// HTMLエスケープ関数（強化版）
export function htmlEscape(str) {
  if (!str || typeof str !== 'string') return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;');
}

// テキストサニタイゼーション（悪意あるコンテンツの除去）
export function sanitizeText(input) {
  if (!input || typeof input !== 'string') return '';
  
  // 基本的なHTMLエスケープ
  let sanitized = htmlEscape(input.trim());
  
  // 制御文字の除去（改行とタブは保持）
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // 連続する空白の正規化
  sanitized = sanitized.replace(/\s+/g, ' ');
  
  return sanitized;
}

// メールアドレス検証（RFC5322準拠の厳密なバリデーション）
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  // 長さチェック
  if (email.length > 254) return false;
  
  // 基本的な形式チェック
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) return false;
  
  // ローカル部の長さチェック（@より前）
  const localPart = email.split('@')[0];
  if (localPart.length > 64) return false;
  
  // ドメイン部の検証
  const domain = email.split('@')[1];
  if (!domain || domain.length > 253) return false;
  
  // 連続するドットの禁止
  if (email.includes('..')) return false;
  
  return true;
}

// 名前の検証
export function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  
  // 長さチェック
  if (trimmedName.length < 1 || trimmedName.length > 100) return false;
  
  // 危険な文字の検出
  const dangerousChars = /<[^>]*>|javascript:|data:|vbscript:|on\w+\s*=/i;
  if (dangerousChars.test(trimmedName)) return false;
  
  return true;
}

// メッセージの検証
export function validateMessage(message) {
  if (!message || typeof message !== 'string') return false;
  
  const trimmedMessage = message.trim();
  
  // 長さチェック
  if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) return false;
  
  // 危険な文字の検出
  const dangerousChars = /<script|javascript:|data:|vbscript:|on\w+\s*=/i;
  if (dangerousChars.test(trimmedMessage)) return false;
  
  // スパム的なパターンの検出
  const spamPatterns = [
    /(.)\1{50,}/i, // 同じ文字の50回以上の繰り返し
    /(https?:\/\/[^\s]+){10,}/i, // 10個以上のURL
    /[^\x00-\x7F]{1000,}/, // 1000文字以上の非ASCII文字
  ];
  
  for (const pattern of spamPatterns) {
    if (pattern.test(trimmedMessage)) return false;
  }
  
  return true;
}

// お問い合わせタイプの検証
export function validateContactType(contactType) {
  const validTypes = [
    '所属アーティストのライブについて',
    'グッズ販売について',
    '所属アーティストについて',
    '出演・取材依頼について',
    '楽曲使用について',
    'その他'
  ];
  
  return validTypes.includes(contactType);
}

// IPアドレスの検証
export function isValidIP(ip) {
  if (!ip || typeof ip !== 'string') return false;
  
  // IPv4の検証
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) return true;
  
  // IPv6の基本的な検証
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv6Regex.test(ip)) return true;
  
  return false;
}

// フォームデータ全体の検証
export function validateFormData(data) {
  const errors = [];
  
  if (!validateContactType(data.contactType)) {
    errors.push('お問い合わせ内容の選択が無効です。');
  }
  
  if (!validateName(data.name)) {
    errors.push('お名前は1文字以上100文字以内で入力してください。');
  }
  
  if (!validateEmail(data.email)) {
    errors.push('有効なメールアドレスを入力してください。');
  }
  
  if (!validateMessage(data.message)) {
    errors.push('お問い合わせ内容は10文字以上5000文字以内で入力してください。');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// サニタイズ済みフォームデータの生成
export function sanitizeFormData(data) {
  return {
    contactType: data.contactType, // 選択肢なのでそのまま
    name: sanitizeText(data.name),
    email: data.email.trim().toLowerCase(), // メールは小文字化
    message: sanitizeText(data.message)
  };
} 