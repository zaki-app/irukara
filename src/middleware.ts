import { NextRequest, NextResponse } from 'next/server';

/* 全体で使用するnode.jsミドルウェア */
export {} from 'next-auth/middleware';

// export const config = { matcher: ['/mypage', '/mypage/[id]'] };
// export default function config() {}

// basic認証
export const config = {
  matcher: ['/:path*', '/index/:path*'],
};

export function middleware(req: NextRequest) {
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
