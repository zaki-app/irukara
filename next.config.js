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
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  },
  // サーバー側で使用する環境変数
  env: {
    IRUKARA_API_ENDPOINT: process.env.IRUKARA_API_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
    LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_AUTH_AWS_ACCESS_KEY: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    NEXT_AUTH_AWS_SECRET_KEY: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    NEXT_AUTH_AWS_REGION: process.env.NEXT_AUTH_AWS_REGION,
    CURRENT_STAGE: process.env.CURRENT_STAGE,
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  },
  // SVGR
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // 圧縮無効
          },
        },
      ],
    });
    return config;
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
