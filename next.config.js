/** @type {import('next').NextConfig} */
const alphardConfig = {
  reactStrictMode: false, // k_sonokiと同じ設定に
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/assets/**',
      },
    ],
    domains: ['alphard.jp'], // OGP画像ドメインを許可リストに追加
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false
  },
  // 本番環境のassetPrefix
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://alphard.jp' : '',
};

module.exports = alphardConfig;