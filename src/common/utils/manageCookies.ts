'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME } from '../constants';

// cookieから値を取得する
export async function getCookie(name: string) {
  const cookie = cookies().get(name);
  return cookie?.value;
}

// cookiesに保存する
export async function setCookie(name: string, value: string, option?: Date) {
  // デフォルトは1日
  const defaultExpires = Date.now() + 24 * 60 * 60 * 1000;

  const expires = option || defaultExpires;

  cookies().set({
    name,
    value,
    httpOnly: true,
    path: '/',
    expires,
    secure: true,
    sameSite: 'lax',
  });
}

// cookieを全て削除
export async function allDeleteCookies() {
  try {
    cookies().delete(COOKIE_NAME.IRUKARA_ID);
    cookies().delete(COOKIE_NAME.IRUKARA_JWT);
    cookies().delete(COOKIE_NAME.IRUKARA_PROVIDER);
    cookies().delete(COOKIE_NAME.IRUKARA_EXPIRES_AT);
    cookies().delete('next-auth.state');
    cookies().delete('next-auth.session-token');
    cookies().delete('next-auth.csrf-token');
    cookies().delete('next-auth.nonce');
    cookies().delete('next-auth.callback-url');
  } catch (err) {
    console.error('all cookie delete error...', err);
  }
  // cookies().set({
  //   name: COOKIE_NAME.IRUKARA_ID,
  //   value: '',
  //   expires: new Date('2016-10-6'),
  //   path: '/',
  // });
  // cookies().set({
  //   name: COOKIE_NAME.IRUKARA_JWT,
  //   value: '',
  //   expires: new Date('2016-10-6'),
  //   path: '/',
  // });
  // cookies().set({
  //   name: COOKIE_NAME.IRUKARA_PROVIDER,
  //   value: '',
  //   expires: new Date('2016-10-6'),
  //   path: '/',
  // });
  // cookies().set({
  //   name: COOKIE_NAME.IRUKARA_EXPIRES_AT,
  //   value: '',
  //   expires: new Date('2016-10-6'),
  //   path: '/',
  // });
  // nextauth
  // cookies().set({
  //   name: 'next-auth.session-token',
  //   value: '',
  //   expires: new Date('2016-10-6'),
  //   path: '/',
  // });
  // return true;
  // } catch (err) {
  //   console.error('all cookie remove error...', err);
  //   return false;
  // }
}

// 特定のcookieを削除
export async function deleteCookie(name: string) {
  cookies().delete(name);
}
