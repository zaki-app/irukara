import type { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import type { Adapter } from 'next-auth/adapters';
import createUserIdHash from '@/common/libs/createHash';
import { setCookie } from '@/common/utils/manageCookies';
import Provider from 'next-auth/providers';
// import { GOOGLE_AUTH } from './refreshTokenFn';
// import { dynamoAdapter } from './adapter';

// // next-authの型を拡張
// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id?: string;
//       accessToken?: string;
//     } & DefaultSession['user'];
//   }
// }

/**
 * next-authで使用するオプション
 */
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      issuer: process.env.GOOGLE_CLIENT_ID,
      checks: 'nonce',
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
  ],
  // adapter: dynamoAdapter as Adapter,
  debug: true,
  // LINEログイン時userIDを取得できるようにセッション戦略はjwtにする
  // googleのATは１時間有効
  // lineのATは1ヶ月有効
  callbacks: {
    // ここで1日有効なリフレッシュトークンを取得するのがいいか？
    // ここでdynamodbに保存するのがいいのか？
    async signIn({ user, account, profile }) {
      // const userData = await dynamoAdapter.getUser?.(user.id);
      console.log('nextauthのサインイン', user, account, profile);
      // console.log('認証情報', credentials);
      // console.log('adapterの情報', userData);

      if (account && account.access_token && account) {
        setCookie('provider', account.provider);
        setCookie('irukaraAT', account.access_token);
        setCookie('irukaraID', createUserIdHash(profile?.sub as string));
        setCookie('irukara_refresh', account.refresh_token as string);
      }
      // TODO サインインした際にDBにユーザー情報を保存したい
      return true;
    },
    // db管理なので必要なし 呼ばれない
    async jwt(props) {
      console.log('JWTです', props);
      // 新しいオブジェクトを作成
      const updatedToken = { ...props.token };
      console.log('api token', props);
      if (props.user) {
        updatedToken.sub = props.token.sub;
      }
      return updatedToken;
    },
    // 毎回呼ばれる
    async session(props) {
      console.log('セッションプロップス', props);
      // const userData = await dynamoAdapter.getUser?.(user.id);
      // const currentSession = await dynamoAdapter.getUser?.(props.user.id);

      const dateString = '2023-12-26T02:01:41.826Z';
      const unix = Math.floor(
        new Date(dateString).getTime() -
          new Date('1970-01-01T00:00:00Z').getTime() / 1000,
      );
      console.log('ユニックス', unix);

      // 新しいオブジェクトを作成
      const updatedSession = { ...props.session };
      // const updatedSession: AddLineUserIdSession = { ...props.session };
      // if (updatedSession?.user) {
      //   // idはLINE, googleともにhash値にする
      //   // updatedSession.user.id = createUserIdHash(props.user.id);
      //   updatedSession.user.id = props.user.id;
      // }

      return updatedSession;
    },
    // signIn後のリダイレクト先
    async redirect(props) {
      return props.baseUrl;
    },
  },
  session: {
    // strategy: 'database',
    strategy: 'jwt',
  },
};
