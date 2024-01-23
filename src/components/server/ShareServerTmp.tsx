'use server';

import { SELECT_MODE } from '@/common/constants';
import { IRUKARA_API, LAMBDA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { MessageType } from '@/types/message';

interface ShareServerTmpProps {
  type: number; // SELECT_MODE
}

export default async function ShareServerTmp({ type }: ShareServerTmpProps) {
  let response: any;
  try {
    if (type === SELECT_MODE.GPT3) {
      const path = IRUKARA_API.GET_ALL_SHARE;
      const { data } = await getApi(path);
      response = data as MessageType[];
    }
  } catch (err) {
    console.error(`${type} APIのエラー`, err);
    response = false;
  }
  console.log(`${type} response`, response);

  return (
    <div>
      share
      <div>
        {response &&
          response.map((res: any) => (
            <div key={res.messageId}>{res.question}</div>
          ))}
      </div>
    </div>
  );
}
