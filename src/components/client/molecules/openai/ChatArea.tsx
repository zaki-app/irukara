'use client';

import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import Image from 'next/image';
import React, { useState } from 'react';
import { InButton } from '@/components/client/atoms';
// import UserIcon from 'public/images/user.svg';
import { useChat } from 'ai/react';
import { API } from '@/common/constants/path';

interface ChatAreaProps {
  type: number;
}

export default function ChatArea({ type }: ChatAreaProps) {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({ api: '/api/openai/top' });

  console.log('メッセージ', messages);

  // async function sendMessage() {
  //   if (input) {
  //     const params = {
  //       // messages: { role: 'user', content: input as string },
  //       input,
  //       type,
  //     };
  //     const result = await fetch(API.CHAT_GPT, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(params),
  //     });
  //     console.log('レスポンス', await result.json());
  //   }
  // }

  return (
    <>
      <div className='flex justify-start items-center'>
        <Image
          src={irukaraBasic}
          alt={irukaraBasicAlt}
          width={30}
          height={30}
        />
        <p className='ml-2'>質問受付中...</p>
      </div>
      <div className='mt-4'>{/* <UserIcon width={30} height={30} /> */}</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className='my-2 bg-slate-200 p-2 w-full'
          placeholder='1回だけ無料でお試しできます。'
          value={input}
          onChange={handleInputChange}
        />
        <button type='submit'>
          <InButton
            buttonStyle='max-w-[120px] px-6 py-2 bg-gradient-to-r from-blue-600 to-sky-500 text-base'
            text='送信'
            // onClick={() => sendMessage()}
          />
        </button>
      </form>
    </>
  );
}
