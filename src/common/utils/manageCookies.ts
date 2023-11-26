'use server';

import { cookies } from 'next/headers';

// cookiesに保存する
export async function setCookie(name: string, value: string, option?: Date) {
  console.time('cookies');
  // デフォルトは1日
  const defaultExpires = Date.now() + 24 * 60 * 60 * 1000;

  const expires = option || defaultExpires;

  cookies().set({
    name,
    value,
    httpOnly: true,
    path: '/',
  });
  cookies().set(name, value, { expires });
  console.timeEnd('cookies');
}

// cookiesを削除
export async function deleteCookie() {
  console.time('cookies2');
  cookies().set({
    name: 'auth',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: 'irukaraAT',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: 'irukaraId',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: 'browser',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  console.timeEnd('cookies2');
}

/** cookieにアクセストークンとuserIdがあるかの存在確認 */
export async function isCookie() {
  const accessToken = cookies().get('irukaraAT');
  const userId = cookies().get('irukaraId');
  let isCookieValue;
  if (accessToken || !userId) {
    console.log('クッキーなし');
    isCookieValue = false;
  } else {
    console.log('クッキーあり');
    isCookieValue = true;
  }

  return isCookieValue;
}

// cookieから値を取得する
export async function getCookie(name: string) {
  const cookie = cookies().get(name);
  return cookie?.value;
}

// cookieを全て削除
export async function allDeleteCookies() {
  console.time('cookies2');
  cookies().set({
    name: 'provider',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: 'irukaraAT',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  cookies().set({
    name: 'irukaraID',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  console.timeEnd('cookies2');
}
