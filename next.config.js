/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-3626123a908346a7a8be8d9295f44e26.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'dev-irukara-profile-image.s3.ap-northeast-1.amazonaws.com',
      },
    ],
    domains: [
      'scdn.line-apps.com',
      'cdn.stablediffusionapi.com',
      'cdn2.stablediffusionapi.com',
      'pub-3626123a908346a7a8be8d9295f44e26.r2.dev',
      'dev-irukara-profile-image.s3.ap-northeast-1.amazonaws.com',
    ],
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
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    BASIC_USER: process.env.BASIC_USER,
    BASIC_PASSWORD: process.env.BASIC_PASSWORD,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
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
