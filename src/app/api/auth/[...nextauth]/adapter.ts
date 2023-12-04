import { COOKIE_NAME } from '@/common/constants';
import { getCookie } from '@/common/utils/manageCookies';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

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
export const dynamoAdapter = DynamoDBAdapter(client, {
  tableName:
    process.env.CURRENT_STAGE === 'local'
      ? 'local-next-auth-table'
      : `${process.env.CURRENT_STAGE}-IrukaraAuth`,
});

// テーブルからセッションを削除(next-authのセッションのみ)
export async function deleteNextAuthSession() {
  const sessionToken = await getCookie(COOKIE_NAME.NEXT_AUTH_SESSION);
  if (dynamoAdapter.deleteSession) {
    const deleteSession = await dynamoAdapter.deleteSession(sessionToken);
    console.log('delete session...', await deleteSession);
  }
}
