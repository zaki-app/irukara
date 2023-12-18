// messageAPIへアクセスする中間API

import { IRUKARA_API } from '@/common/constants/path';
import { postApi } from '@/common/libs/api/lambda/requestClient';
import { NextRequest, NextResponse } from 'next/server';

/**
 * chatgpt3.5データ自動保存
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  let response;
  let status;
  try {
    // typeを取得する
    if (req.nextUrl.searchParams.get('type') !== null) {
      const apiKey = req.nextUrl.searchParams.get('type');
      const body = await req.json();
      console.log('post body', body);
      if (apiKey) {
        const res = await postApi(IRUKARA_API.POST_MSG, body);
        console.log('response', res);

        if (res.statusCode !== 200) {
          throw Error('post message response status not 200...');
        } else {
          response = res;
        }
      } else {
        throw Error('not found apiKey...');
      }
    } else {
      throw Error('post message error...');
    }
  } catch (err) {
    console.error('POST Message Error...', err);
    response = false;
    status = 500;
  }

  console.log('POST Message Response...', response);
  return NextResponse.json(response, { status });
}
