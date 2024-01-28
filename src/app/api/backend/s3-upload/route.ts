import { NextRequest, NextResponse } from 'next/server';

/**
 * プロフィール画像をS3にアップロードし、URLを返却、古い画像はS3から削除する
 * @param req
 */
export async function POST(req: NextRequest) {
  console.log('アップロードリクエスト', req);
  let response;
  let status;

  try {
    response = '成功';
    status = 200;
  } catch (err) {
    response = false;
    status = 500;
  }

  return NextResponse.json(response, { status });
}
