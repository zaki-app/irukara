'use client';

import {
  DEFAULT_USER_LOGO,
  irukaraBasic,
  irukaraBasicAlt,
} from '@/common/config/site.config';
import Image from 'next/image';
import React from 'react';
import { InButton } from '@/components/client/atoms';
import { useChat } from 'ai/react';
import { API } from '@/common/constants/path';

interface ChatAreaProps {
  type: number;
}

export default function ChatArea({ type }: ChatAreaProps) {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({ api: API.TOP_GPT });

  return (
    <>
      <div className='mt-4 flex justify-start items-center'>
        <ul>
          {messages.map((message) => (
            <li
              key={message.id}
              className='flex justify-start items-center mb-2'
            >
              {/* ユーザー画像 */}
              <div className='mr-4 max-w-[10%]'>
                {message.role === 'user' ? (
                  <Image
                    src={DEFAULT_USER_LOGO}
                    alt='ユーザーロゴ'
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    src={irukaraBasic}
                    alt={irukaraBasicAlt}
                    width={30}
                    height={30}
                  />
                )}
              </div>
              {/* 質問と回答 */}
              <div className='max-w-[90%] max-h-[100px] overflow-auto'>
                {message.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
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
          />
        </button>
      </form>
    </>
  );
}
