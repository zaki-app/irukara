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
  TOP_GPT: '/api/openai/top',
};

// CALLBACK
export const CALLBACK = {
  SIGNIN_URL: '/api/auth/signin?callbackUrl=/server',
  LOGOUT_URL: '/api/auth/signout',
};

// external API
export const EXTERNAL_API = {
  GPT: 'https://api.openai.com/v1/chat/completions',
};
