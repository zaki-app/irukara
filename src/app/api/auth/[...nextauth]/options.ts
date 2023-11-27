import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import { setCookie } from '@/common/utils/manageCookies';
import { COOKIE_NAME } from '@/common/constants';
import createUserIdHash from '@/common/libs/createHash';

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
      // checks: 'nonce',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('ユーザーサインイン', user, account, profile);
      // ここでユーザーを検索して、なかったら登録する

      // 必要な情報をcookieに保存する
      if (account && profile) {
        // lineの場合は有効期限が長いのでaccessTokenを保存。googleはrefreshTokenを保存
        const { provider } = account;

        if (provider === 'google') {
          setCookie(COOKIE_NAME.IRUKARA_JWT, account.refresh_token as string);
        } else if (provider === 'line') {
          setCookie(COOKIE_NAME.IRUKARA_JWT, account.access_token as string);
        }

        setCookie(
          COOKIE_NAME.IRUKARA_ID,
          createUserIdHash(profile.sub as string),
        );
        setCookie(COOKIE_NAME.IRUKARA_PROVIDER, provider as string);
        setCookie(
          COOKIE_NAME.IRUKARA_EXPIRES_AT,
          account.expires_at?.toString() as string,
        );
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session(props) {
      console.log('セッションです', props.session);

      const responseSession = {
        ...props.session,
      };

      return responseSession;
    },
    // signIn後のリダイレクト先
    async redirect(props) {
      return props.baseUrl;
    },
  },
};
