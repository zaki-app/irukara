import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { startEndUnix } from '@/common/libs/dateFormat';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { GetMessagesType } from '@/types/message';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 自動保存のメッセージを取得
 * @param req
 * @pathParams type
 * DATE...日付を指定して取得
 * REFE...保存・共有など状況によって取得
 * なし...最大150件取得
 * @pathParams target 0...今日、1...昨日などでunix時間を指定
 * DATEの場合...何日前のunixを取得するか
 * REFEの場合...保存・共有どちらを取得するか
 * @returns
 */
export async function GET(
  req: NextRequest,
): Promise<NextResponse<GetMessagesType>> {
  console.log('GET request...', req.nextUrl.searchParams);
  let response;
  let status;

  try {
    // userIdをcookieから取得
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
    // typeを確認
    const { searchParams } = req.nextUrl;
    const type = searchParams.get('type');
    const target = searchParams.get('target');

    // type別にエンドポイントを作成
    if (type === 'DATE') {
      const { start, end } = startEndUnix(Number(target));
      console.log('start end unix...', start, end, userId);
      const path = IRUKARA_API.GET_MSG_DATE.replace('{userId}', userId)
        .replace('{startUnix}', start.toString())
        .replace('{endUnix}', end.toString());
      const res = await getApi(path);
      response = res;
      status = 200;
    } else if (type === 'REFE') {
      // 保存・共有
    } else {
      // メッセージを最新のものから150件取得
    }
  } catch (err) {
    console.error('get message api error...', err);
    response = false;
    status = 500;
  }

  return NextResponse.json(response, { status });
}
