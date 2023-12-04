import { COOKIE_NAME } from '@/common/constants';
import { getCookie } from '@/common/utils/manageCookies';
import { refreshTokenFn } from '@/app/api/auth/[...nextauth]/refreshTokenFn';
import { currentUnix } from '../../dateFromat';

interface GetAuthInfoRes {
  token: string;
  userId: string;
  provider: string;
}

// APIアクセスに必要な情報
async function getAuthInfo(): Promise<GetAuthInfoRes> {
  const provider = await getCookie(COOKIE_NAME.IRUKARA_PROVIDER);
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const token = `Bearer ${await getCookie(COOKIE_NAME.IRUKARA_JWT)}`;
  const expires = await getCookie(COOKIE_NAME.IRUKARA_EXPIRES_AT);
  let refresh = '';

  if (provider === 'google') {
    // 期限が切れていたらrefreshtokenから新しいtokenを取得
    if (Number(expires) < currentUnix()) {
      refresh = await getCookie(COOKIE_NAME.IRUKARA_REFRESH);
      const refreshRes = await refreshTokenFn(refresh);
      console.log('リフレッシュトークン', refreshRes);
    }
  } else if (provider === 'line') {
    // lineはアクセストークンが1ヶ月有効なのでそのまま使用する
  }

  return {
    token,
    userId,
    provider,
  };
}

// GET
export async function getApi(path: string) {
  const { token, provider } = await getAuthInfo();
  let response;
  try {
    const res = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
        provider: provider ?? '',
      },
    });

    if (!res.ok) throw new Error(`get response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('get request...', err);
    response = false;
  }

  console.log('finish response...', response);

  return response;
}
