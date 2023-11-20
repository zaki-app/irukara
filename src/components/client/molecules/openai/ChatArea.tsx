'use client';

import {
  DEFAULT_USER_LOGO,
  irukaraBasic,
  irukaraBasicAlt,
} from '@/common/config/site.config';
import Image from 'next/image';
import React, { useState } from 'react';
import { InButton } from '@/components/client/atoms';
import { API } from '@/common/constants/path';
import { validateChat } from '@/common/utils/varidate/chat';
import { processChunks } from '@/common/utils/stream';
import { ERROR_MSG } from '@/common/utils/error/message';

interface ChatAreaProps {
  type: number;
}

export default function ChatArea({ type }: ChatAreaProps) {
  const [inputMsg, setInputMsg] = useState<string>('');
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [chunkAnswer, setChunkAnswer] = useState<string>('');

  async function sendQuestion(message: string) {
    console.log('メッセージ', message);
    if (isValidate || errorMsg.length > 1) {
      setErrorMsg(ERROR_MSG.EXEC_ACCESS);
    } else {
      try {
        const response = await fetch(API.TOP_GPT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            type: 1,
          }),
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = response.body;
        if (!data) return;

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          console.log('chunk...', chunkValue);
          setChunkAnswer((prev) => prev + chunkValue);
        }
      } catch (err) {
        console.error('error...', err);
        setErrorMsg(ERROR_MSG.EXEC_ACCESS);
      }
    }
  }

  return (
    <>
      <div className='mt-6 flex justify-start items-center'>
        <div>
          <div className='flex justify-start items-center mb-2'>
            <Image
              src={DEFAULT_USER_LOGO}
              alt='ユーザーロゴ'
              width={30}
              height={30}
            />
            <p className='ml-4'>{inputMsg}</p>
          </div>
          <div className='flex justify-start items-center'>
            <Image
              src={irukaraBasic}
              alt={irukaraBasicAlt}
              width={30}
              height={30}
            />
            <p className='ml-4'>
              {chunkAnswer.length > 0
                ? chunkAnswer
                : 'お試しは1日1回質問できるよ'}
            </p>
          </div>
        </div>
      </div>
      <textarea
        className='my-4 bg-slate-200 p-2 w-full'
        placeholder='1回だけ無料でお試しできます。(質問は25文字以下です)'
        value={inputMsg}
        onChange={(e) => {
          const validate = validateChat(e.target.value);
          if (e.target.value.length > 25) {
            setInputMsg(e.target.value.slice(0, 25));
          } else {
            setInputMsg(e.target.value);
          }
          setValidate(validate.result);
          if (validate.text.length > 0) {
            setErrorMsg(validate.text);
          }
        }}
      />
      {isValidate && (
        <p className='text-red-400 font-semibold mb-2'>{errorMsg}</p>
      )}
      <button disabled={isValidate}>
        <InButton
          buttonStyle={`${
            !isValidate
              ? 'max-w-[120px] px-6 py-2 bg-gradient-to-r text-base from-blue-600 to-sky-500'
              : 'max-w-[120px] px-6 py-2 bg-gradient-to-r text-base bg-slate-400 text-gray-400'
          }`}
          text='送信'
          onClick={() => sendQuestion(inputMsg)}
        />
      </button>
    </>
  );
}
