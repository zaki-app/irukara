import { IRUKARA_API } from '@/common/constants/path';
import { postApi } from '@/common/libs/api/lambda/requestClient';
import { ImageGenerateRes } from '@/types/image';
import { NextRequest, NextResponse } from 'next/server';

/**
 * stable diffusionでテキストから画像を生成
 * ImageTableへの保存、カウント数の増加はLambda側でやっている
 */
export async function POST(
  req: NextRequest,
): Promise<NextResponse<ImageGenerateRes>> {
  let response;
  let status;

  try {
    const { userId, prompt, memberStatus, type } = await req.json();

    let path = '';
    if (type === 2) {
      path = IRUKARA_API.POST_ILLUST_IMAGE;
    }

    const illustRes = await postApi(path, {
      userId,
      prompt,
      memberStatus,
    });

    if (illustRes.status === 200 || illustRes.status === 202) {
      response = illustRes.data;
    }
  } catch (err) {
    console.error('POST Message Error...', err);
    response = false;
    status = 500;
  }

  return NextResponse.json(response, { status });
}
