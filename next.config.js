/** @type {import('next').NextConfig} */
const alphardConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = alphardConfig;