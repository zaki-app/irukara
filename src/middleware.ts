/* 全体で使用するnode.jsミドルウェア */
import { NextRequest, NextResponse } from 'next/server';

// export { default as nextAuthDefault } from 'next-auth/middleware';

// basic認証
export const config = {
  matcher: ['/:path*', '/index/:path*'],
};

/**
 * local以外ではbasic認証
 * @param req
 * @returns
 */
export function middleware(req: NextRequest) {
  if (process.env.CURRENT_STAGE !== 'local') {
    const basicAuth = req.headers.get('Authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, password] = atob(authValue).split(':');
      if (
        user === process.env.BASIC_USER &&
        password === process.env.BASIC_PASSWORD
      ) {
        return NextResponse.next();
      }
      return NextResponse.json(
        { error: 'Invalid credentials' },
        {
          headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
          status: 401,
        },
      );
    }
    return NextResponse.json(
      { error: 'Please enter credentials' },
      {
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
        status: 401,
      },
    );
  }
  return NextResponse.next();
}
