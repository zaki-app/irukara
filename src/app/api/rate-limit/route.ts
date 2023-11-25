import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * レートリミット
 * @param req
 * @param {type} 1...TOPのchat, 2...全体
 * @returns
 */
export async function GET(req: NextRequest) {
  console.log('redisが実行');
  try {
    // typeを取得する
    const limitType = req.nextUrl.searchParams.get('type');

    // ipアドレスを取得
    const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(
      ',',
    )[0];

    console.log('ipアドレス', ip);

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    });

    let limitTime;
    let limitCount;
    if (Number(limitType) === 1) {
      if (process.env.CURRENT_STAGE === 'dev') {
        limitCount = 10;
        limitTime = '10 s';
      } else {
        limitCount = 2;
        limitTime = '86400 s';
      }
    } else if (limitType) {
      limitCount = 10;
      limitTime = '10 s';
    }

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(limitCount as number, limitTime as any),
    });

    const { success } = await ratelimit.limit(ip);
    console.log('rate limit...', success);

    if (!success) {
      return NextResponse.json(
        {
          result: false,
          message: 'too many request',
        },
        {
          status: 429,
        },
      );
    }
    return NextResponse.json({
      result: true,
      message: 'ok',
    });
  } catch (err) {
    console.error('rate limit error...', err);

    return NextResponse.json({ result: false, message: err });
  }
}
