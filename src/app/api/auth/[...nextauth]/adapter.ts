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
