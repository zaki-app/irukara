'use server';

import { cookies } from 'next/headers';

// cookiesに保存する
export async function setCookie(name: string, value: string) {
  console.time('cookies');
  cookies().set({
    name,
    value,
    httpOnly: true,
    path: '/',
  });
  console.timeEnd('cookies');
}

// cookiesを削除
export async function deleteCookie() {
  console.time('cookies2');
  cookies().set({
    name: 'irukara',
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
  console.timeEnd('cookies2');
}

/** cookieにアクセストークンがあるかの存在確認 */
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

/* cookieからアクセストークンを取得する */
export async function getAccessToken() {
  const token = cookies().get('irukara');
  return token?.value;
}

/* cookieからuserIdを取得する */
export async function getUserId() {
  const irukara = cookies().get('irukaraId');
  return irukara?.value;
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
