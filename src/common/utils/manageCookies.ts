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
  console.time('cookies');
  // デフォルトは1日
  const defaultExpires = Date.now() + 24 * 60 * 60 * 1000;

  const expires = option || defaultExpires;

  console.log('セットクッキー', expires);

  cookies().set({
    name,
    value,
    httpOnly: true,
    path: '/',
    expires,
    secure: true,
  });
  console.timeEnd('cookies');
}

// cookieを全て削除
export async function allDeleteCookies() {
  console.time('cookies2');
  cookies().set({
    name: COOKIE_NAME.IRUKARA_ID,
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: COOKIE_NAME.IRUKARA_JWT,
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: COOKIE_NAME.IRUKARA_PROVIDER,
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  console.timeEnd('cookies2');
}

// 特定のcookieを削除
export async function deleteCookie(name: string) {
  cookies().delete(name);
}
