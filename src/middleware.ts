/* 全体で使用するnode.jsミドルウェア */
export {} from 'next-auth/middleware';

export const config = { matcher: ['/mypage', '/mypage/[id]'] };
