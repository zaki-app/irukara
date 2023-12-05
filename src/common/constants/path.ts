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
  SERVER_LOGOUT_URL: '/api/auth/signout?callbackUrl=/api/auth/session',
  LOGOUT_CSRF: '/api/auth/csrf',
};

// external API
export const EXTERNAL_API = {
  GOOGLE_AUTH: 'https://accounts.google.com/o/oauth2/v2/auth?',
  GOOGLE_TOKEN: 'https://oauth2.googleapis.com/token?',
};

// Lambda API
export const LAMBDA_API = process.env.IRUKARA_API_ENDPOINT;
export const IRUKARA_API = {
  GET_USER_ID: `${LAMBDA_API}search-user/{userId}`,
  POST_USER: `${LAMBDA_API}register-user`,
};
