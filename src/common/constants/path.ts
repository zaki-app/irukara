/* パスをまとめる */

import { IrukaraApiUnion } from '@/types/constants';

// クライアント
export const LINK_PATH = {
  TERMS_TITLE: '利用規約',
  TERMS: '/legal/irukara-terms',
  PRIVACY_TITLE: 'プライバシーポリシー',
  PRIVACY: '/legal/privacy-policy',
  MEMBER: 'for-users/membership',
};

// Lambda API endpoint
export const LAMBDA_API = process.env.IRUKARA_API_ENDPOINT;

// 中間API
export const API = {
  TOP_GPT: '/api/playground/top',
  RATE_LIMIT_TOP_CHAT: '/api/rate-limit/top-limit?type={:type}',
  // 中間API
  RELAY_POST_MSG: '/api/backend/message?type={:type}',
  RELAY_GET_MSG: '/api/backend/message/{:userId}?type={:type}&target={:target}',
  RELAY_PUT_MSG: '/api/backend/message/{:userId}',
  RELAY_GET_IMAGE:
    '/api/backend/image/{:userId}?type={:type}&target={:target}&imageType={:imageType}',
  // イラスト
  RELAY_POST_ILLUST: '/api/backend/image',
  // リアル画像
  RELAY_POST_REAL: '/api/backend/real',
  // 画像共通
  RELAY_PUT_ILLUST: '/api/backend/image/{:userId}',
  // ユーザー更新
  PUT_USER: '/api/backend/user/{:userId}',
  // S3
  POST_S3_UPLOAD: '/api/backend/s3-upload',
};

// LambdaAPI
export const IRUKARA_API: IrukaraApiUnion = {
  // user
  GET_USER_ID: `${LAMBDA_API}search-user/{userId}`,
  POST_USER: `${LAMBDA_API}register-user`,
  PUT_USER: `${LAMBDA_API}update-user/{userId}`,
  // message
  GET_MSG_DATE: `${LAMBDA_API}save-messages/{userId}?type=date&start={startUnix}&end={endUnix}`,
  GET_MSG_REFE: `${LAMBDA_API}save-messages/{userId}?type=reference&status={num}`,
  GET_MSG: `${LAMBDA_API}save-messages/{userId}`,
  GET_MSG_ID: `${LAMBDA_API}save-message-detail/{messageId}?createdAt={createdAt}`,
  POST_MSG: `${LAMBDA_API}save-chat-message`,
  PUT_MSG: `${LAMBDA_API}save-message-update/{messageId}/createdAt/{createdAt}`,
  DEL_MSG: `${LAMBDA_API}save-message-delete/{messageId}/createdAt/{createdAt}`,
  GET_ALL_SHARE: `${LAMBDA_API}message-gsi/shareStatus?value=1`,
  // image
  GET_IMAGES: `${LAMBDA_API}save-images/{userId}?type=date&start={startUnix}&end={endUnix}&imageType={imageType}`,
  POST_ILLUST_IMAGE: `${LAMBDA_API}save-illust-image`,
  PUT_ILLUST_IMAGE: `${LAMBDA_API}save-image-update/{imageId}/createdAt/{createdAt}`,
  POST_REAL_IMAGE: `${LAMBDA_API}save-real-image`,
  // s3
  GET_S3_OBJECT: `${LAMBDA_API}get-s3?Key={key}`,
  POST_S3_UPLOAD: `${LAMBDA_API}upload-s3`,
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

// page link
export const PAGE_LINK = {
  PROFILE: '/account/settings',
  PLAN: '/for-users/membership',
};
