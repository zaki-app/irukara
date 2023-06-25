import {
  getAccessToken,
  getUserId,
} from '@/common/utils/authLINE/manageCookies';

/** メッセージデータ関係 */
export default async function fetchMessage() {
  console.time('messageAPIspeed');
  let data;
  try {
    const userId = (await getUserId()) ?? '';
    const token = (await getAccessToken()) ?? '';
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-messages/${userId}`;
    const response = await fetch(endpoint, {
      headers: { Authorization: token },
      cache: 'no-cache',
    });
    if (response.status === 200) {
      data = await response.json();
    }
    console.timeEnd('messageAPIspeed');
  } catch (err) {
    console.error('エラーです', err);
  }
  return data;
}
