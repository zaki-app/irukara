'use server';

import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API, LAMBDA_API } from '@/common/constants/path';
import { getCookie } from '@/common/utils/manageCookies';
import type { GetUserIdRes } from '@/types/auth/api';

interface GetAuthInfoRes {
  token: string;
  userId: string;
  provider: string;
}

// APIアクセスに必要な情報
async function getAuthInfo(): Promise<GetAuthInfoRes> {
  const provider = (await getCookie(COOKIE_NAME.IRUKARA_PROVIDER)) as string;
  const userId = (await getCookie(COOKIE_NAME.IRUKARA_ID)) as string;
  let token = '';
  if (provider === 'google') {
    // 期限が切れていたらrefreshtokenから新しいtokenを取得
  } else if (provider === 'line') {
    token = `Bearer ${await getCookie(COOKIE_NAME.IRUKARA_JWT)}` as string;
  }

  return {
    token,
    userId,
    provider,
  };
}

export async function getUserId(): Promise<GetUserIdRes | boolean> {
  const { token, provider, userId } = await getAuthInfo();
  const endpoint = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  let response;

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
        provider,
      },
      // cache: 'force-cache',
    });

    if (res.status === 200) {
      const json = await res.json();
      console.log('json', json);

      response = json.data as GetUserIdRes;
    } else {
      console.error('response not 200 message...', res.status);
      response = false;
      // throw new Error('Response from getUserId was not 200...');
    }
  } catch (err) {
    console.error('getUserId error...', err);
    response = false;
  }

  return response;
}
