import { COOKIE_NAME } from '@/common/constants';
import { updateToken } from '@/app/api/auth/[...nextauth]/updateToken';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { currentUnix } from '../../dateFormat';

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
      const newToken = await updateToken(refresh);
      console.log('リフレッシュトークン', newToken);
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
  console.log('getApi path', path);
  let response;
  try {
    const { token, provider } = await getAuthInfo();
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

  return response;
}

// POST
export async function postApi(path: string, body: any) {
  console.log('post message arg...', path, body);
  let response;
  try {
    const { token, provider } = await getAuthInfo();
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
        provider: provider ?? '',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`post response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('post request...', err);
    response = false;
  }

  console.log('post finish response...', response);

  return response;
}

// PUT
export async function putApi(path: string, body: any) {
  console.log('put api arg...', path, body);
  let response;
  try {
    const { token, provider } = await getAuthInfo();
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
        provider: provider ?? '',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`post response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('post request...', err);
    response = false;
  }

  return response;
}

// 中間POST
export async function relayPostApi(path: string, body: any) {
  console.log('post message arg...', path, body);
  let response;
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`post response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('post request...', err);
    response = false;
  }

  console.log('post finish response...', response);

  return response;
}

// 中間PUT
export async function relayPutApi(path: string, body: any) {
  console.log('put message arg...', path, body);
  let response;
  try {
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`put response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('put request...', err);
    response = false;
  }

  console.log('put finish response...', response);

  return response;
}

// 中間POST(ファイルアップロード)
export async function filePostApi(path: string, body: any, fileType: string) {
  console.log('post message arg...', path, body, fileType);
  let response;
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': fileType,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`post response error... ${res.status}`);

    response = await res.json();
  } catch (err) {
    console.error('post request...', err);
    response = false;
  }

  console.log('post finish response...', response);

  return response;
}
