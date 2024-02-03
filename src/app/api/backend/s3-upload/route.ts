import { IRUKARA_API } from '@/common/constants/path';
import { postApi } from '@/common/libs/api/lambda/requestClient';
import { NextRequest, NextResponse } from 'next/server';

/**
 * プロフィール画像をS3にアップロードし、URLを返却、古い画像はS3から削除する
 * @param req
 */
export async function POST(req: NextRequest) {
  // console.log('front req', req);
  // let response;
  // let status;
  // try {
  //   const body = await req.json();

  //   response = await postApi(IRUKARA_API.POST_S3_UPLOAD, body);
  //   status = 200;
  //   console.log('upload result', response);
  // } catch (err) {
  //   console.error('upload error...', err);
  //   response = false;
  //   status = 500;
  // }

  // return NextResponse.json(response, { status });
  return NextResponse.json('hello');
}
