import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import { getCookie, setCookie } from '@/common/utils/manageCookies';
import { COOKIE_NAME } from '@/common/constants';
import createUserIdHash from '@/common/libs/createHash';
import { currentUnix } from '@/common/libs/dateFormat';
import { Adapter } from 'next-auth/adapters';
import { getCsrfToken } from 'next-auth/react';
import { getApi, postApi } from '@/common/libs/api/lambda/requestClient';
import { IRUKARA_API } from '@/common/constants/path';
import { deleteNextAuthSession, dynamoAdapter } from './adapter';

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
      // 必要な情報をcookieに保存する
      if (account && profile) {
        console.log('signin account', account);
        // lineの場合は有効期限が長いのでaccessTokenを保存。googleはrefreshTokenとaccessTokenを保存
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
        // ユーザーIDから検索し、ない場合はUsersTableに保存する
        console.log('signin登録情報', user, profile);
        const getUserEndpoint = IRUKARA_API.GET_USER_ID.replace(
          '{userId}',
          userId,
        );
        const { result, data } = await getApi(getUserEndpoint);
        console.log('ユーザーは存在するか', result, data);
        // ユーザー保存処理
        if (!data) {
          const params = {
            userId,
            lineId: provider, // GSIは空文字で登録できない
            registerMethod: 'web',
            providerType: provider,
            status: 0,
          };
          const res = await postApi(IRUKARA_API.POST_USER, params);
          console.log('ユーザー登録レスポンス', res);
        }
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
