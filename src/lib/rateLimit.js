// レート制限ユーティリティ
class RateLimiter {
  constructor() {
    this.attempts = new Map();
    this.cleanup();
  }

  // 古いエントリを定期的にクリーンアップ
  cleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, data] of this.attempts.entries()) {
        if (now - data.lastAttempt > 60 * 60 * 1000) { // 1時間後にクリーンアップ
          this.attempts.delete(key);
        }
      }
    }, 10 * 60 * 1000); // 10分ごとにクリーンアップ
  }

  // レート制限チェック
  isRateLimited(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const key = identifier;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, { count: 1, firstAttempt: now, lastAttempt: now });
      return false;
    }

    const data = this.attempts.get(key);
    
    // ウィンドウ期間が過ぎていれば リセット
    if (now - data.firstAttempt > windowMs) {
      this.attempts.set(key, { count: 1, firstAttempt: now, lastAttempt: now });
      return false;
    }

    // 制限に達している場合
    if (data.count >= maxAttempts) {
      data.lastAttempt = now;
      return true;
    }

    // カウントを増やす
    data.count++;
    data.lastAttempt = now;
    return false;
  }

  // 残り時間を取得
  getRemainingTime(identifier, windowMs = 15 * 60 * 1000) {
    const data = this.attempts.get(identifier);
    if (!data) return 0;
    
    const elapsed = Date.now() - data.firstAttempt;
    return Math.max(0, windowMs - elapsed);
  }

  // 特定のIPをリセット（管理用）
  reset(identifier) {
    this.attempts.delete(identifier);
  }
}

// グローバルインスタンス
const rateLimiter = new RateLimiter();

export default rateLimiter; 