'use server';

import { COOKIE_NAME } from '@/common/constants';
import { cookies } from 'next/headers';

// cookieから値を取得する
export async function getCookie(name: string): Promise<string> {
  const cookie = cookies().get(name);
  return (cookie?.value as string) ?? '';
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

// cookieが存在するか？
export async function isAllCookies(): Promise<boolean> {
  const isId = cookies().get(COOKIE_NAME.IRUKARA_ID);
  const isJwt = cookies().get(COOKIE_NAME.IRUKARA_JWT);
  const isExpires = cookies().get(COOKIE_NAME.IRUKARA_EXPIRES_AT);
  const isProvider = cookies().get(COOKIE_NAME.IRUKARA_PROVIDER);
  const isRefresh = cookies().get(COOKIE_NAME.IRUKARA_REFRESH);

  let isCookie;

  if (isId || isJwt || isExpires || isProvider || isRefresh) {
    isCookie = true;
  } else {
    isCookie = false;
  }

  return isCookie;
}

// cookieを全て削除
export async function allDeleteCookies() {
  try {
    cookies().delete(COOKIE_NAME.IRUKARA_ID);
    cookies().delete(COOKIE_NAME.IRUKARA_JWT);
    cookies().delete(COOKIE_NAME.IRUKARA_PROVIDER);
    cookies().delete(COOKIE_NAME.IRUKARA_EXPIRES_AT);
    cookies().delete(COOKIE_NAME.IRUKARA_REFRESH);
  } catch (err) {
    console.error('all cookie delete error...', err);
  }
}

// 特定のcookieを削除
export async function deleteCookie(name: string): Promise<void> {
  cookies().delete(name);
}
