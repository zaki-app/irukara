/* パスをまとめる */
// クライアント
export const LINK_PATH = {
  TERMS_TITLE: '利用規約',
  TERMS: '/legal/irukara-terms',
  PRIVACY_TITLE: 'プライバシーポリシー',
  PRIVACY: '/legal/privacy-policy',
};

// API
export const API = {
  TOP_GPT: '/api/playground/top',
  RATE_LIMIT_TOP_CHAT: '/api/rate-limit/top-limit',
};

// CALLBACK
export const CALLBACK = {
  SIGNIN_URL: '/api/auth/signin?callbackUrl=/server',
  LOGOUT_URL: '/api/auth/signout',
};

// external API
export const EXTERNAL_API = {
  GOOGLE_AUTH: 'https://accounts.google.com/o/oauth2/v2/auth?',
  GOOGLE_TOKEN: 'https://oauth2.googleapis.com/token?',
};
