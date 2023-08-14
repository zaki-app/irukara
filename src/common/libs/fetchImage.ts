import { SaveImageData } from '../types/fetchData';
import { getCookie } from '../utils/authLINE/manageCookies';

interface Limit50SaveImageType {
  count: number;
  data: SaveImageData[] | false;
}

/* 画像データを50件まで取得 */
export async function fetchImages(mode: number): Promise<Limit50SaveImageType> {
  let imageData;
  const errorResponse: { data: boolean } = { data: false };
  try {
    const userId = (await getCookie('irukaraId')) ?? '';
    const token = (await getCookie('irukaraAT')) ?? '';
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-images/${userId}?mode=${mode}`;
    console.log('エンドポイント', endpoint);
    const response = await fetch(endpoint, {
      headers: {
        Authorization: token,
      },
      cache: 'no-cache',
    });

    if (response.status === 200) {
      imageData = await response.json();
    } else {
      imageData = errorResponse;
    }
  } catch (err) {
    console.error('画像取得エラー', err);
    imageData = errorResponse;
  }

  // カウントがない場合はエラーを返す
  if (!imageData.count) {
    imageData = errorResponse;
  }

  console.log('get all response...', imageData);
  return imageData;
}

export async function fetchImageId() {
  console.log('');
}
