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
    domains: ['alphard.info'], // OGP画像ドメインを許可リストに追加
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false
  },
  // 本番環境のassetPrefix
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = alphardConfig;