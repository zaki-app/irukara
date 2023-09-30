/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // 外部Imageパスを使用する
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profile.line-scdn.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.stablediffusionapi.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.stablediffusionapi.com',
      },
    ],
    domains: [
      'scdn.line-apps.com',
      'cdn.stablediffusionapi.com',
      'cdn2.stablediffusionapi.com',
    ],
  },
  // サーバー側で使用する環境変数
  env: {
    IRUKARA_API_ENDPOINT: process.env.IRUKARA_API_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
    LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
    NEXT_AUTH_AWS_SECRET_KEY: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    NEXT_AUTH_AWS_REGION: process.env.NEXT_AUTH_AWS_REGION,
    CURRENT_STAGE: process.env.CURRENT_STAGE,
    CLIENT_SITE_URL: process.env.CLIENT_SITE_URL,
  },
};

// バンドルサイズ
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});

module.exports = nextConfig;
