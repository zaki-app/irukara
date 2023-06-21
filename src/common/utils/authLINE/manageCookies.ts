'use server';

import { cookies } from 'next/headers';
// import { CookieJar } from 'tough-cookie';

// アクセストークンをcookiesに保存する
export async function setCookie(token: string) {
  console.time('cookies');
  cookies().set({
    name: 'irukara',
    value: token,
    httpOnly: true,
    path: '/',
  });
  console.timeEnd('cookies');
}

export async function deleteCookie() {
  console.time('cookies2');
  cookies().set({
    name: 'irukara',
    value: '',
    expires: new Date('2016-10-6'),
    path: '/',
  });
  console.timeEnd('cookies2');
}

/** cookieの存在確認 */
export async function isCookie() {
  const cookiesList = cookies().get('irukara');
  let isCookieValue;
  if (!cookiesList) {
    console.log('クッキーなし');
    isCookieValue = false;
  } else {
    console.log('クッキーあり');
    isCookieValue = true;
  }

  return isCookieValue;
}

/** 現在保存されているcookiewのサイズを確認する(ローカルでのみ使用) */
// export async function getCookiesSize() {
//   const cookieJar = new CookieJar();
//   const cookiesUrl = cookieJar.getCookiesSync('/');

//   let totalSize = 0;
//   cookiesUrl.forEach((cookie) => {
//     totalSize += cookie.cookieString().length;
//   });
//   console.log('容量', totalSize);
// }
