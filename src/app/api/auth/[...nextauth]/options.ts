import type { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import type { Adapter } from 'next-auth/adapters';
import createUserIdHash from '@/common/libs/createHash';
import { setCookie } from '@/common/utils/authLINE/manageCookies';

/**
 * LINEのuserIdをdefaultSessionに追加
 */
interface AddLineUserIdSession extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
    accessToken?: string | null;
  };
}

/* DynamoDB Adapter */
const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  region: process.env.NEXT_AUTH_AWS_REGION as string,
};
const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});
// テーブルのカスタム
const adapter = DynamoDBAdapter(client, {
  tableName: `${process.env.CURRENT_STAGE}-AuthUserManagerTable`,
});

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
  adapter: adapter as Adapter,
  // LINEログイン時userIDを取得できるようにセッション戦略はjwtにする
  callbacks: {
    async signIn(props) {
      const user = await adapter.getUser?.(props.user.id);
      console.log('ユーザー検索できるか？', user);
      console.log('signinです', props);

      if (props.account && props.account.access_token && props.account) {
        setCookie('provider', props.account.provider);
        setCookie('irukaraAT', props.account.access_token);
        setCookie('irukaraID', createUserIdHash(props.profile?.sub as string));
      }
      return true;
    },
    async jwt(props) {
      // 新しいオブジェクトを作成
      const updatedToken = { ...props.token };
      console.log('api token', props);
      if (props.user) {
        updatedToken.sub = props.token.sub;
      }
      return updatedToken;
    },
    async session(props) {
      console.log('セッションプロップス', props);
      // 新しいオブジェクトを作成
      const updatedSession: AddLineUserIdSession = { ...props.session };
      // if (updatedSession?.user) {
      //   // idはLINE, googleともにhash値にする
      //   // updatedSession.user.id = createUserIdHash(props.user.id);
      //   updatedSession.user.id = props.user.id;
      // }

      console.log('ユーザー情報', updatedSession);
      return updatedSession;
    },
    async redirect(props) {
      return props.baseUrl;
    },
  },
  session: {
    strategy: 'database',
  },
};
