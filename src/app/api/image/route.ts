import logColor from '@/common/config/logColor';
import { getCookie } from '@/common/utils/authLINE/manageCookies';
import { NextRequest, NextResponse } from 'next/server';

interface ImageApiResponse {
  status: number;
  result: boolean;
}

/* 画像データを50件まで取得 */
// http://localhost:18000/api/image?mode=1or2
export async function GET(req: NextRequest): Promise<NextResponse> {
  // // クエリを取得
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode');
  console.log('selected mode...', mode);
  console.log('request cookies...', req.cookies);

  let imageData: ImageApiResponse;
  const errorResponse = {
    status: 500,
    result: false,
  };

  try {
    const irukaraId = req.cookies.get('irukaraId')?.value;
    const irukaraAt = req.cookies.get('irukaraAT')?.value;
    console.log('request...', irukaraId, irukaraAt);
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-images/${irukaraId}?mode=${mode}`;
    console.log('image illust endpoint...', endpoint);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: irukaraAt as string,
      },
    });

    if (response.status === 200) {
      imageData = await response.json();
      console.log('api画像データ', imageData);
    } else {
      imageData = errorResponse;
    }
  } catch (err) {
    console.error('画像取得エラー', err);
    imageData = errorResponse;
  }

  console.log('imageData response...', imageData);

  return NextResponse.json({ imageData });
}
