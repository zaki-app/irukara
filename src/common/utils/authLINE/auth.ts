'use server';

import { redirect } from 'next/navigation';
import { getCookie } from './manageCookies';

/* ログイン済みか判定する */
export async function isAuth() {
  const irukaraId = await getCookie('irukaraId');
  const irukaraAT = await getCookie('irukaraAT');

  let isAuthState;
  if (irukaraId && irukaraAT) {
    isAuthState = true;
  } else {
    isAuthState = false;
    // redirect("/")
  }

  return isAuthState;
}
