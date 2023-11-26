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
import { Message, useChat } from 'ai/react';

interface ChatAreaProps {
  type: number;
}

export default function ChatArea({ type }: ChatAreaProps) {
  const { messages, handleInputChange, handleSubmit } = useChat({
    api: API.TOP_GPT,
  });

  const [inputMsg, setInputMsg] = useState<string>('');
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // console.log('メッセージです', messages);

  return (
    <>
      <div className='mt-6'>
        {messages.map((message: Message) => (
          <div key={message.id}>
            {message.role === 'user' && (
              <div
                key={message.id}
                className='flex justify-start items-center mb-2'
              >
                <Image
                  src={DEFAULT_USER_LOGO}
                  alt='ユーザーロゴ'
                  width={30}
                  height={30}
                />
                <p className='ml-4'>{message.content}</p>
              </div>
            )}
            {message.role === 'assistant' && (
              <div className='flex justify-start items-center'>
                <Image
                  src={irukaraBasic}
                  alt={irukaraBasicAlt}
                  width={30}
                  height={30}
                />
                <p className='ml-4'>
                  {message.content
                    ? message.content
                    : 'お試しは1日1回質問できるよ'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            setInputMsg('');
            const res = await fetch(API.RATE_LIMIT_TOP_CHAT);
            const rate = await res.json();
            if (rate.result) {
              handleSubmit(e);
            } else {
              console.log('rate limit error...1', rate);
            }
          } catch (err) {
            console.error('rate limit error2...', err);
          }
        }}
      >
        <textarea
          className='my-4 bg-slate-200 p-2 w-full'
          placeholder='1日2回だけ無料でお試しできます。(質問は25文字以下です)'
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
            if (!validate.result) {
              handleInputChange(e);
            }
          }}
        />
        {isValidate && (
          <p className='text-red-400 font-semibold mb-2'>{errorMsg}</p>
        )}
        <button disabled={isValidate} type='submit'>
          <InButton
            buttonStyle={`${
              !isValidate
                ? 'max-w-[120px] px-6 py-2 bg-gradient-to-r text-base from-blue-600 to-sky-500'
                : 'max-w-[120px] px-6 py-2 bg-gradient-to-r text-base bg-slate-400 text-gray-400'
            }`}
            text='送信'
          />
        </button>
      </form>
    </>
  );
}
