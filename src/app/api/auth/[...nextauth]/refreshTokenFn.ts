import { EXTERNAL_API } from '@/common/constants/path';

// export const GOOGLE_AUTH =
//   EXTERNAL_API.GOOGLE_AUTH +
//   new URLSearchParams({
//     prompt: 'consent',
//     access_type: 'offline',
//     response_type: 'code',
//   });

/**
 * リフレッシュトークンから新しいアクセストークンを取得
 * @param token
 * @returns
 */
export async function refreshTokenFn(refresh_token: string) {
  console.log('tokenには何が入ってる？', refresh_token);
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

    console.log('リフレッシュ後', refreshToken);

    return {
      accessToken: refreshToken.access_token,
      accessTokenExpires: 86400, // 1日
      refreshToken: refreshToken.refresh_token ?? refresh_token,
    };
  } catch (err) {
    console.error('refresh token error...', err);

    return {
      error: 'RefreshAccessTokenError',
    };
  }
}
