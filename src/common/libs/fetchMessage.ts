import { getCookie } from '@/common/utils/manageCookies';
import type { SaveMessageData } from '@/types/fetchData';

interface AllSaveMessageProps {
  count: number;
  data: SaveMessageData[];
}

/** メッセージデータ関係 */
export async function fetchMessage(): Promise<AllSaveMessageProps> {
  let data;
  const errorResponse: { data: boolean } = { data: false };
  try {
    const userId = (await getCookie('irukaraId')) ?? '';
    const token = (await getCookie('irukaraAT')) ?? '';
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-messages/${userId}`;
    // console.log('エンドポイント', endpoint);
    const response = await fetch(endpoint, {
      // method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: token,
      },
      // cache: 'no-cache',
      // cache: 'no-store',
      cache: 'force-cache',
    });
    if (response.status === 200) {
      data = await response.json();
    } else {
      data = errorResponse;
    }
  } catch (err) {
    console.error('エラーです', err);
    data = errorResponse;
  }

  // カウントがない場合はエラーを返す
  if (!data.count) {
    data = errorResponse;
  }

  console.log('get all response...', data.count);
  return data;
}

/* 保存メッセージの詳細を取得する */
export async function fetchMessageDetail(id: string): Promise<SaveMessageData> {
  console.time('detailTest');
  let data;
  try {
    const token = (await getCookie('irukaraAT')) ?? '';
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-message-detail/${id}`;
    const res = await fetch(endpoint, {
      // method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: token,
      },
      cache: 'no-cache',
    });
    if (res.status === 200) {
      const response = await res.json();
      data = response.data;
    } else {
      data = false;
    }
    console.timeEnd('detailTest');
  } catch (err) {
    console.error('get detail error...', err);
    data = false;
  }

  // データがなかった場合はエラーを返す
  if (!Object.keys(data).length) {
    data = false;
  }
  console.log('final detail response', data);
  return data;
}
