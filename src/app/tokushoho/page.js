import '../../styles/legal.css';

export const metadata = {
  title: '特定商取引法に基づく表記 - Alphard',
  description: '株式会社アルファルドの特定商取引法に基づく表記ページです。',
};

export default function TokushohoPage() {
  return (
    <section className="legal-section">
      <div className="legal-container">
        <div className="legal-content">
          <h2 className="legal-title ja-text">特定商取引法に基づく表記</h2>

          <div className="legal-table">
            <div className="info-row">
              <div className="info-label ja-text">販売業者</div>
              <div className="info-content ja-text">株式会社アルファルド</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">運営統括責任者</div>
              <div className="info-content ja-text">柿添 泰裕</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">所在地</div>
              <div className="info-content ja-text">
                請求があった場合には遅滞なく開示いたします。<br />
                お問い合わせ先: support@alphard.info
              </div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">電話番号</div>
              <div className="info-content ja-text">
                請求があった場合には遅滞なく開示いたします。<br />
                お問い合わせ先: support@alphard.info
              </div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">メールアドレス</div>
              <div className="info-content ja-text">support@alphard.info</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">販売URL</div>
              <div className="info-content ja-text">https://alphard-admin.vercel.app</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">販売価格</div>
              <div className="info-content ja-text">各イベントページに記載の金額（税込）</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">商品代金以外の必要料金</div>
              <div className="info-content ja-text">なし（別途ドリンク代等が必要な場合はイベントページに記載）</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">支払方法</div>
              <div className="info-content ja-text">
                クレジットカード決済（Stripe経由）<br />
                Apple Pay / Google Pay
              </div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">支払時期</div>
              <div className="info-content ja-text">予約時に即時決済</div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">商品の引渡時期</div>
              <div className="info-content ja-text">
                決済完了後、LINE にて予約確認メッセージを送信いたします。<br />
                イベント当日、受付にてお名前を確認のうえご入場いただけます。
              </div>
            </div>

            <div className="info-row">
              <div className="info-label ja-text">返品・キャンセルについて</div>
              <div className="info-content ja-text">
                イベントの性質上、お客様都合による返品・返金は原則としてお受けできません。<br />
                主催者都合によるイベント中止・延期の場合は全額返金いたします。<br />
                キャンセルのご連絡は運営公式LINEアカウントまでお願いいたします。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
