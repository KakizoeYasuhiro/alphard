import crypto from 'crypto';

// CSRF トークンを生成
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// CSRF トークンを検証
export function verifyCSRFToken(token, storedToken) {
  if (!token || !storedToken) return false;
  
  // 定数時間比較でタイミング攻撃を防ぐ
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(storedToken, 'hex')
    );
  } catch (error) {
    return false;
  }
}

// セキュアなランダム文字列を生成
export function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// IPアドレスを取得（プロキシ対応）
export function getClientIP(request) {
  // Vercelやその他のプロキシ経由の場合
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const connectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwarded) {
    // 複数のIPが含まれている場合、最初のIPを取得
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (connectingIP) {
    return connectingIP;
  }
  
  // 直接接続の場合（開発環境など）
  return request.ip || '127.0.0.1';
}

// User-Agentのフィンガープリンティング
export function getUserAgentFingerprint(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  
  // 基本的なフィンガープリント（ハッシュ化）
  const fingerprint = crypto.createHash('sha256')
    .update(userAgent + acceptLanguage + acceptEncoding)
    .digest('hex');
  
  return fingerprint.substring(0, 16); // 16文字に短縮
}

// セキュリティログの生成
export function createSecurityLog(request, action, details = {}) {
  const timestamp = new Date().toISOString();
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const fingerprint = getUserAgentFingerprint(request);
  
  return {
    timestamp,
    ip,
    userAgent,
    fingerprint,
    action,
    details,
    url: request.url,
    method: request.method
  };
}

// 悪意あるリクエストの検出
export function detectMaliciousRequest(request, formData) {
  const warnings = [];
  
  // 異常に大きなペイロード
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 50000) { // 50KB以上
    warnings.push('LARGE_PAYLOAD');
  }
  
  // 疑わしいUser-Agent
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousUA = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'php',
    'postman', 'insomnia', 'httpx', 'requests'
  ];
  
  if (suspiciousUA.some(ua => userAgent.toLowerCase().includes(ua))) {
    warnings.push('SUSPICIOUS_USER_AGENT');
  }
  
  // 異常に短い送信間隔（人間では不可能な速度）
  if (formData) {
    const totalLength = Object.values(formData).join('').length;
    if (totalLength < 10) {
      warnings.push('MINIMAL_CONTENT');
    }
  }
  
  // 危険なキーワードの検出
  const dangerousKeywords = [
    'eval(', 'function(', 'javascript:', '<script', 'document.cookie',
    'window.location', 'XMLHttpRequest', 'fetch('
  ];
  
  const allText = JSON.stringify(formData || {}).toLowerCase();
  for (const keyword of dangerousKeywords) {
    if (allText.includes(keyword.toLowerCase())) {
      warnings.push('DANGEROUS_CONTENT');
      break;
    }
  }
  
  return {
    isSuspicious: warnings.length > 0,
    warnings,
    riskLevel: warnings.length > 2 ? 'HIGH' : warnings.length > 0 ? 'MEDIUM' : 'LOW'
  };
}

// ハッシュ化されたIPアドレス（プライバシー保護）
export function hashIP(ip) {
  // 日付を含めることで、IPアドレスの追跡を困難にしつつログには残す
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const salt = process.env.IP_HASH_SALT || 'default-salt-change-this';
  
  return crypto.createHash('sha256')
    .update(ip + salt + today)
    .digest('hex')
    .substring(0, 12);
} 