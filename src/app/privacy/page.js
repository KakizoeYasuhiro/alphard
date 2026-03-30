import '../../styles/legal.css';

export const metadata = {
  title: 'プライバシーポリシー - Alphard',
  description: '株式会社アルファルドのプライバシーポリシーページです。',
};

export default function PrivacyPage() {
  return (
    <section className="legal-section">
      <div className="legal-container">
        <div className="legal-content">
          <h2 className="legal-title ja-text">プライバシーポリシー</h2>

          <p className="legal-intro ja-text">
            株式会社アルファルド（以下「当社」）は、お客様の個人情報の保護に関し、以下のとおりプライバシーポリシーを定めます。
          </p>

          <h3 className="legal-subtitle ja-text">1. 収集する情報</h3>
          <p className="legal-text ja-text">
            当社は、チケット予約・イベント運営に際して、以下の情報を取得することがあります。
          </p>
          <ul className="legal-list ja-text">
            <li>お名前（LINE表示名を含む）</li>
            <li>メールアドレス</li>
            <li>LINE ユーザーID</li>
            <li>決済に必要な情報（Stripe社が管理。当社はカード情報を保持しません）</li>
          </ul>

          <h3 className="legal-subtitle ja-text">2. 利用目的</h3>
          <p className="legal-text ja-text">取得した情報は以下の目的で利用します。</p>
          <ul className="legal-list ja-text">
            <li>チケット予約の受付・管理・確認連絡</li>
            <li>イベント当日の受付・本人確認</li>
            <li>イベント運営に関するご案内（LINE配信を含む）</li>
            <li>お問い合わせへの対応</li>
            <li>サービスの改善・統計分析（個人を特定しない形で利用）</li>
          </ul>

          <h3 className="legal-subtitle ja-text">3. 第三者への提供</h3>
          <p className="legal-text ja-text">
            当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>
          <ul className="legal-list ja-text">
            <li>法令に基づく場合</li>
            <li>決済処理に必要な範囲でStripe社に提供する場合</li>
            <li>人の生命、身体または財産の保護のために必要な場合</li>
          </ul>

          <h3 className="legal-subtitle ja-text">4. 情報の管理</h3>
          <p className="legal-text ja-text">
            当社は個人情報の漏洩・紛失・改ざんを防止するため、適切なセキュリティ対策を講じます。
            データは暗号化された通信（SSL/TLS）を使用して送受信し、アクセス権限を適切に管理します。
          </p>

          <h3 className="legal-subtitle ja-text">5. 個人情報の開示・訂正・削除</h3>
          <p className="legal-text ja-text">
            ご本人から個人情報の開示・訂正・削除のご請求があった場合は、ご本人確認のうえ、合理的な期間内に対応いたします。
          </p>

          <h3 className="legal-subtitle ja-text">6. Cookieの使用</h3>
          <p className="legal-text ja-text">
            本サービスでは、ログイン状態の管理のためにCookieを使用します。
            Cookieを無効にした場合、一部の機能がご利用いただけない場合があります。
          </p>

          <h3 className="legal-subtitle ja-text">7. ポリシーの変更</h3>
          <p className="legal-text ja-text">
            当社は本ポリシーを変更する場合があります。変更後のポリシーは本ページに掲載した時点で効力を生じるものとします。
          </p>

          <h3 className="legal-subtitle ja-text">8. お問い合わせ</h3>
          <p className="legal-text ja-text">
            個人情報に関するお問い合わせは、以下までご連絡ください。<br />
            株式会社アルファルド<br />
            メール: support@alphard.info
          </p>

          <p className="legal-date ja-text">
            制定日: 2026年4月1日<br />
            株式会社アルファルド
          </p>
        </div>
      </div>
    </section>
  );
}
