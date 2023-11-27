import { EXTERNAL_API } from '@/common/constants/path';

// export const GOOGLE_AUTH =
//   EXTERNAL_API.GOOGLE_AUTH +
//   new URLSearchParams({
//     prompt: 'consent',
//     access_type: 'offline',
//     response_type: 'code',
//   });

export interface RefreshTokenRes {
  access_token: string;
  expires_at: number;
  refresh_token: string;
}

interface RefreshTokenResError {
  error: string;
}

type RefreshTokenResType = RefreshTokenRes | RefreshTokenResError;

/**
 * リフレッシュトークンから新しいアクセストークンを取得
 * @param token
 * @returns
 */
export async function refreshTokenFn(
  refresh_token: string,
): Promise<RefreshTokenResType> {
  try {
    const url =
      EXTERNAL_API.GOOGLE_TOKEN +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    const refreshRes = {
      access_token: refreshToken.access_token,
      expires_at: 86400, // 1日
      refresh_token: refreshToken.refresh_token ?? refresh_token,
    };

    console.log('リフレッシュ', refreshRes);

    return refreshRes;
  } catch (err) {
    console.error('refresh token error...', err);

    return {
      error: 'RefreshAccessTokenError',
    };
  }
}
