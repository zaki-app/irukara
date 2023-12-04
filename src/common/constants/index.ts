// 色々な定数をまとめる
export const GPT_MODEL = 'gpt-3.5-turbo-0613';
// export const GPT_MODEL = 'gpt-3.5-turbo-1106';

// チャットタイプ
export const CHAT_TYPE = {
  TOP: 1,
  MAIN: 2,
};

// cookie
export const COOKIE_NAME = {
  IRUKARA_ID: '__auth-user-id',
  IRUKARA_JWT: '__auth-jwt-token',
  IRUKARA_EXPIRES_AT: '__atuh-token-expires_at',
  IRUKARA_PROVIDER: '__auth-provider',
  IRUKARA_REFRESH: '__auth-jwt-token-refresh',
  // next-auth
  NEXT_AUTH_SESSION: 'next-auth.session-token',
};

// プラン
export const PLAN = [
  '無料プラン',
  'イルカモプラン', // 350円
  'イルカラプラン', // 980円
  '無料プラン', // イルカモから無料
  '無料プラン', // イルカラから無料
  'イルカラプラン', // イルカモからイルカラ
  'イルカモプラン', // イルカラからイルカモ
  'イルカモVIP', // 無制限
  'イルカモプラン', // VIPからイルカモ
  'イルカラプラン', // VIPからイルカラ
  '無料プラン', // VIPから無料
];
