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
  // menu
  SELECTED_MENU: 'selected-key',
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

// レスポンシブ
export const RESPONSIVE = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// 選択モード
export const SELECTED_MENU = [
  'チャットモード(GPT3.5)を選択中です',
  'チャットモード(GPT4)を選択中です',
  'イラストモードを選択中です',
  'リアルモードを選択中です',
];

// 選択モード(sidebar)
export const SIDE_SELECTED_MENU = [
  'チャット(GPT3.5)',
  'チャット(GPT4.0)',
  'イラストモード',
  'リアルモード',
];

// 選択モードタイプ
export const SELECT_MODE = {
  GPT3: 0,
  GPT4: 1,
  ILLUST: 2,
  REAL: 3,
};

// 画像タイプ
export const IMAGE_TYPE = {
  ILLUST: 1,
  REAL: 2,
};

// 共有タイプ
export const SHARE = {
  SAVE: 1,
  CANCEL: 0,
};

// アラートタイプ
export const ALERT_TYPE = {
  SUCCESS: 'success' as const,
  INFO: 'info' as const,
  WARNING: 'warning' as const,
  ERROR: 'error' as const,
};

// アラートコンポーネントタイプ
export const ALERT_COM_TYPE = {
  SIMPLE: 1,
  DESCRIPTION: 2,
};

// 今日か履歴を分岐
export const DATA = {
  TODAY: 1,
  HISTORY: 2,
};
