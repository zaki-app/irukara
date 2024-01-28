import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { putApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ユーザー情報更新中間API
 */
export async function PUT(req: NextRequest) {
  let response;
  let status;

  try {
    const body = await req.json();
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
    const path = IRUKARA_API.PUT_USER.replace('{userId}', userId);

    const res = await putApi(path, body);

    response = res;
    status = 200;
  } catch (err) {
    console.error('user put error...', err);
    response = false;
    status = 500;
  }

  return NextResponse.json(response, { status });
}
