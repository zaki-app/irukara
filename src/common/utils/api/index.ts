/** fetch処理をまとめる */

import { COOKIE_NAME } from '@/common/constants';
import { getCookie } from '../manageCookies';

// GET
export async function getApi(path: string) {
  let response;
  try {
    const res = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${await getCookie(COOKIE_NAME.IRUKARA_JWT)}` ?? '',
        provider: (await getCookie(COOKIE_NAME.IRUKARA_PROVIDER)) ?? '',
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

// // POST
// export async function postAPI(path: string, option: PostOptionType) {
//   let response;
//   try {
//     const res = await fetch(path, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(option),
//     });

//     if (!res.ok) throw new Error(res.statusText);

//     response = res;
//   } catch (err) {
//     console.error('post api error...', err);

//     response = {
//       statusCode: 500,
//       ok: false,
//       body: JSON.stringify({
//         message: 'internal server error...',
//       }),
//     };
//   }

//   return response;
// }
