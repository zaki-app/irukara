import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import {
  allDeleteCookies,
  deleteCookie,
  getCookie,
  setCookie,
} from '@/common/utils/manageCookies';
import { COOKIE_NAME } from '@/common/constants';
import createUserIdHash from '@/common/libs/createHash';
import { currentUnix } from '@/common/libs/dateFromat';
import { Adapter } from 'next-auth/adapters';
import { getCsrfToken, signOut } from 'next-auth/react';
import { CALLBACK } from '@/common/constants/path';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { deleteNextAuthSession, dynamoAdapter } from './adapter';
import searchUser from './searchUser';

export const options: NextAuthOptions = {
  session: { strategy: 'database', maxAge: 24 * 60 * 60 },
  adapter: dynamoAdapter as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
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
      console.log('signin登録情報', user, profile);

      // 必要な情報をcookieに保存する
      if (account && profile) {
        console.log('signin account', account);
        // lineの場合は有効期限が長いのでaccessTokenを保存。googleはrefreshTokenを保存
        const { provider } = account;

        const userId = createUserIdHash(profile.sub as string);

        if (provider === 'google') {
          setCookie(COOKIE_NAME.IRUKARA_JWT, account.access_token as string);
          setCookie(
            COOKIE_NAME.IRUKARA_REFRESH,
            account.refresh_token as string,
          );
        } else if (provider === 'line') {
          setCookie(COOKIE_NAME.IRUKARA_JWT, account.access_token as string);
        }

        setCookie(COOKIE_NAME.IRUKARA_ID, userId);
        setCookie(COOKIE_NAME.IRUKARA_PROVIDER, provider as string);
        setCookie(
          COOKIE_NAME.IRUKARA_EXPIRES_AT,
          account.expires_at?.toString() as string,
        );
        // ユーザー登録or更新処理
        // const userResult = await searchUser(userId);
        // console.log('ユーザー登録状況', userResult);
      }
      return true;
    },
    async session({ session }) {
      let response;

      if (session) {
        // 有効期限のcookieが存在しないor期限切れの場合はnullを返却
        const expiresCookie = await getCookie(COOKIE_NAME.IRUKARA_EXPIRES_AT);
        // 期限以外のauth関係のcookieがない時もセッションをnull
        const unix = currentUnix();

        if (expiresCookie === undefined || Number(expiresCookie) < unix) {
          console.log('cookieがないか有効期限切れ', expiresCookie, unix);
          try {
            // nextauthのセッションをdynamodbから削除する
            await deleteNextAuthSession();
          } catch (err) {
            console.error('server signout error...', err);
          }

          response = null;
        } else {
          response = { ...session.user, isAuth: true };
          console.log('isAuth', response.isAuth);
        }
      }
      return response;
    },
    // signIn後のリダイレクト先
    async redirect({ url, baseUrl }) {
      const csrfToken = await getCsrfToken();
      console.log('csrf', csrfToken);
      console.log('リダイレクト', url, baseUrl);
      return baseUrl;
    },
  },
};
