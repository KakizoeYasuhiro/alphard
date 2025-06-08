# Alphard

Alphard Projectのウェブサイトリポジトリです。

## 環境構築

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## Basic認証の設定

ローカル環境と本番環境でBasic認証を設定するには、以下の環境変数を設定してください。

### ローカル環境

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=設定したいユーザー名
BASIC_AUTH_PASSWORD=設定したいパスワード
```

### Vercel（本番環境）

Vercelのプロジェクト設定で、以下の環境変数を追加してください：

1. `BASIC_AUTH_ENABLED` - 本番環境で認証を有効にする場合は `true`、無効にする場合は `false`
2. `BASIC_AUTH_USER` - Basic認証のユーザー名
3. `BASIC_AUTH_PASSWORD` - Basic認証のパスワード

### 注意事項

- 環境変数 `BASIC_AUTH_ENABLED` が `true` の場合のみ認証が有効になります。
- 開発時に認証を無効にしたい場合は、`.env.local` ファイルで `BASIC_AUTH_ENABLED=false` と設定してください。