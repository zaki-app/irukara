import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import { setCookie } from '@/common/utils/manageCookies';
import { COOKIE_NAME } from '@/common/constants';
import createUserIdHash from '@/common/libs/createHash';
import { refreshTokenFn } from './refreshTokenFn';

// next-authの型を拡張
// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id?: string;
//       accessToken?: string;
//     } & DefaultSession['user'];
//   }
// }

export const options: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      issuer: process.env.GOOGLE_CLIENT_ID,
      checks: 'nonce',
      // refreshToken取得のため下記が必要
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // ここでユーザーを検索して、なかったら登録する
      // ユーザーID、provider、refreshした1日だけ有効のaccesstokenを保存
      const refresh = await refreshTokenFn(account?.refresh_token as string);
      // 必要な情報をcookieに保存する
      setCookie(
        COOKIE_NAME.IRUKARA_ID,
        createUserIdHash(profile?.sub as string),
      );
      setCookie(COOKIE_NAME.IRUKARA_JWT, refresh.accessToken);
      setCookie(COOKIE_NAME.IRUKARA_PROVIDER, account?.provider as string);
      return true;
    },
    // async jwt({ token, account, profile }) {
    //   // console.log('jwtです account', account);
    //   console.log('jwtです token', token);

    //   // const updatedToken = { ...props.token };

    //   // return updatedToken;
    //   return token;
    // },
    async session(props) {
      // console.log('セッションです', props);

      const updatedSession = { ...props.session };
      return updatedSession;
    },
    // signIn後のリダイレクト先
    async redirect(props) {
      return props.baseUrl;
    },
  },
};
