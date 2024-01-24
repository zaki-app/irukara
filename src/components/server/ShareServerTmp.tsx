'use server';

import { SELECT_MODE } from '@/common/constants';
import { IRUKARA_API, LAMBDA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { currentTime } from '@/common/libs/dateFormat';
import { MessageType } from '@/types/message';
import { current } from '@reduxjs/toolkit';

interface ShareServerTmpProps {
  type: number; // SELECT_MODE
}

export default async function ShareServerTmp({ type }: ShareServerTmpProps) {
  let response;
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
          Array.isArray(response) &&
          response.map((res) => (
            <div key={res.messageId}>
              <div className='relative rounded-xl bg-blue-400'>
                <span>{res.question}</span>
                <span>{currentTime(res.createdAt)}</span>
                <div className='left-[-35px] bottom-[15px] w-10 h-10 bg-blue-200 rounded-full' />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
