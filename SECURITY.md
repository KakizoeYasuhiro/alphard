# セキュリティ対策実装ガイド

このドキュメントは、Alphardプロジェクトに実装されたセキュリティ対策について説明します。

## 📋 実装済みセキュリティ対策

### 🛡️ 1. レート制限
- **実装場所**: `src/lib/rateLimit.js`
- **対象**: コンタクトフォーム送信
- **制限**: 15分間に5回まで
- **メモリベース**: サーバー再起動時にリセット
- **自動クリーンアップ**: 10分ごとに実行

### 🔒 2. 入力値検証・サニタイゼーション
- **実装場所**: `src/lib/inputValidation.js`
- **機能**:
  - HTMLエスケープ（XSS対策）
  - RFC5322準拠のメールアドレス検証
  - 文字数制限（名前: 100文字、メッセージ: 5000文字）
  - 危険なパターンの検出
  - スパムコンテンツの検出

### 🔐 3. セキュリティヘッダー
- **実装場所**: `next.config.js`, `src/middleware.js`
- **設定済みヘッダー**:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security` (HTTPS時)
  - `Referrer-Policy`
  - `Permissions-Policy`

### 🌐 4. HTTPS強制
- **実装場所**: `src/middleware.js`
- **対象**: 本番環境のみ
- **動作**: HTTPアクセスを自動的にHTTPSにリダイレクト

### 🚦 5. CORS設定
- **実装場所**: `next.config.js`, `src/middleware.js`
- **設定**:
  - 本番環境: `https://alphard.info` のみ許可
  - 開発環境: localhost許可
  - プリフライトリクエスト対応

### 🔍 6. 悪意あるリクエスト検出
- **実装場所**: `src/lib/security.js`
- **検出項目**:
  - 異常に大きなペイロード (50KB以上)
  - 疑わしいUser-Agent
  - 危険なキーワード
  - 最小コンテンツ攻撃

### 📝 7. セキュリティログ
- **実装場所**: `src/app/api/contact/route.js`
- **記録項目**:
  - タイムスタンプ
  - ハッシュ化されたIPアドレス
  - User-Agentフィンガープリント
  - アクション種別
  - 処理時間
  - reCAPTCHAスコア

### 🤖 8. reCAPTCHA v3
- **バージョン**: v3 (スコアベース)
- **閾値**: 0.3以上で許可
- **統合**: react-google-recaptcha-v3

### 🔑 9. 環境変数検証
- **実装場所**: `src/app/api/contact/route.js`
- **機能**: 起動時に必要な環境変数の存在をチェック

### 🛠️ 10. Basic認証
- **実装場所**: `src/middleware.js`
- **機能**: オプションでサイト全体にBasic認証を適用
- **エラーハンドリング**: Base64デコードエラーの適切な処理

## 🚀 本番環境でのセキュリティ設定

### 必須環境変数
```bash
# セキュリティ
NODE_ENV=production
IP_HASH_SALT=your_unique_salt_here

# Basic認証（推奨）
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=your_admin_user
BASIC_AUTH_PASSWORD=your_strong_password

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# メール送信
RESEND_API_KEY=your_resend_api_key
```

### セキュリティチェックリスト

#### 🔴 高優先度
- [ ] 強力なBasic認証パスワードの設定
- [ ] IP_HASH_SALTの変更
- [ ] reCAPTCHAキーの設定
- [ ] HTTPS証明書の有効性確認
- [ ] セキュリティヘッダーの動作確認

#### 🟡 中優先度
- [ ] ログ監視システムの導入
- [ ] レート制限値の調整
- [ ] CSPポリシーの微調整
- [ ] 定期的なセキュリティ監査

#### 🟢 低優先度
- [ ] セキュリティメトリクスの収集
- [ ] 攻撃パターンの分析
- [ ] セキュリティ通知の自動化

## 🔧 メンテナンス

### 定期的な作業
1. **週次**: セキュリティログの確認
2. **月次**: レート制限データのクリーンアップ確認
3. **四半期**: セキュリティ設定の見直し
4. **年次**: 依存関係のセキュリティ監査

### アップデート時の注意点
- Next.jsアップデート時はセキュリティヘッダーの動作確認
- 依存関係更新時は脆弱性スキャンの実行
- reCAPTCHA設定変更時は閾値の再調整

## 🚨 インシデント対応

### レート制限超過時
1. 該当IPのアクセスログ確認
2. 攻撃パターンの分析
3. 必要に応じてレート制限値の調整

### セキュリティアラート時
1. 即座にアクセスログの確認
2. 攻撃の種類と規模の評価
3. 必要に応じて一時的なアクセス制限

### データ漏洩疑い時
1. 即座にサービス停止を検討
2. ログの完全バックアップ
3. セキュリティ専門家への相談

## 📚 参考資料

- [OWASP セキュリティガイド](https://owasp.org/)
- [Next.js セキュリティ](https://nextjs.org/docs/advanced-features/security-headers)
- [reCAPTCHA v3 ドキュメント](https://developers.google.com/recaptcha/docs/v3)
- [CSP リファレンス](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 📞 問い合わせ

セキュリティに関する問題や提案がある場合は、プロジェクト管理者まで連絡してください。

---

**重要**: このドキュメントには機密情報は含まれていませんが、実際の本番環境の設定値は別途安全に管理してください。 