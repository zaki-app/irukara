'use client';

import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import { API } from '@/common/constants/path';
import { currentTime, startEndUnix } from '@/common/libs/dateFormat';
import { commonValidate } from '@/common/utils/varidate/input';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import { RootState } from '@/store';
import { GetMessagesType, MessageType } from '@/types/message';
import { useChat, Message } from 'ai/react';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function ChatGpt() {
  // userId, statusを取得
  const { userId, status } = useSelector(
    (state: RootState) => state.authUserDataSlice,
  );

  const [question, setQuestion] = useState<string>('');
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isNext, setNext] = useState<boolean>(false);
  const [isResStatus, setResStatus] = useState<boolean>(false);
  const [numToday, setToday] = useState<number>(0);
  const [todayMessages, setTodayMessages] = useState<MessageType[]>([]);

  const { messages, handleInputChange, handleSubmit, isLoading } = useChat({
    api: API.TOP_GPT,
    onFinish: async (message: Message) => {
      const params = {
        userId,
        question,
        answer: message.content,
        memberStatus: status,
      };

      const path = API.RELAY_POST_MSG.replace('{:type}', 'POST_MSG');
      const res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (res.ok) {
        // 正常に保存処理が終了した時
        setResStatus(true);
      }
    },
  });
  const { image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  // 質問を送信
  async function onSubmitFn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (question) {
      setQuestion('');
      handleSubmit(e);
      setNext(true);
    }
  }

  function textValidate(e: ChangeEvent<HTMLTextAreaElement>) {
    const validate = commonValidate(e.target.value, 250);
    if (e.target.value.length > 250) {
      setQuestion(e.target.value.slice(0, 250));
    } else {
      setQuestion(e.target.value);
    }
    setValidate(validate.result);
    if (validate.text.length > 0) {
      setErrorMsg(validate.text);
    }
    if (!validate.result) {
      handleInputChange(e);
    }
  }

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const path = API.RELAY_GET_MSG.replace('{:type}', 'DATE').replace(
      '{:target}',
      '0',
    );
    const res = await fetch(path);
    if (res.ok) {
      const todayData = await res.json();
      console.log('今日のデータ', todayData.count);
      // 今日のメッセージを格納
      setTodayMessages(todayData.data);
      setToday(todayData.count);
    }
  }

  useEffect(() => {
    (async () => {
      console.log('useEffect1');
      await getTodayMessage();
      console.log('useEffect2 ここになったらデータが表示される');
    })();
  }, []);

  return (
    <div className='h-full'>
      <div className='flex flex-col h-[calc(100%-140px)] overflow-y-auto mb-[150px]'>
        {/* 保存済みの今日のやり取り */}
        {numToday > 0 ? (
          <>
            {todayMessages.map((today) => (
              <div key={today.messageId} className='mb-3 bg'>
                {/* ユーザー */}
                <div className='flex justify-start items-center border-2 rounded-lg bg-neutral-50 p-4 mb-4'>
                  <Image
                    src={image}
                    alt='ユーザーロゴ'
                    width={30}
                    height={30}
                    className='rounded-full border border-gray-300'
                  />
                  <div className='flex flex-col ml-4 w-full'>
                    <p>{today.question}</p>
                    <p className='flex justify-end'>
                      {currentTime(today.createdAt)}
                    </p>
                  </div>
                </div>
                {/* Irukara */}
                <div className='flex justify-start items-start border-2 border-blue-200 rounded-lg bg-blue-50 p-4 mb-6'>
                  <Image
                    src={irukaraBasic}
                    alt={irukaraBasicAlt}
                    width={30}
                    height={30}
                    className='rounded-full border-2 border-blue-500 bg-sky-200 shadow-md'
                  />
                  <div className='flex flex-col ml-4 w-full'>
                    <p>{today.answer}</p>
                    <p className='flex justify-end'>
                      {currentTime(today.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <InputPrompt type={1} />
        )}
        {/* 追加のやり取り */}
        {isNext &&
          messages.map((message: Message) => (
            <div key={message.id} className='mb-3'>
              {message.role === 'user' && (
                <div className='flex justify-start items-start'>
                  <Image
                    src={image}
                    alt='ユーザーロゴ'
                    width={30}
                    height={30}
                    className='rounded-full border border-gray-300'
                  />
                  <p className='ml-4'>{message.content}</p>
                </div>
              )}
              {message.role === 'assistant' && (
                <div className='mb-3'>
                  <div className='flex justify-start items-start'>
                    <Image
                      src={irukaraBasic}
                      alt={irukaraBasicAlt}
                      width={30}
                      height={30}
                      className='rounded-full border border-gray-300'
                    />
                    <p className='ml-4'>{message.content}</p>
                  </div>
                  {isResStatus && (
                    <div className='flex justify-end'>
                      <button className='bg-blue-500 text-white py-1 px-2 rounded-md mr-3'>
                        保存
                      </button>
                      <button className='bg-line text-white py-1 px-2 rounded-md'>
                        共有
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className='fixed left-0 bottom-0 w-full px-8 py-4 h-[140px] bg-white'>
        <form
          onSubmit={async (e) => onSubmitFn(e)}
          className='relative w-full bg-white h-full gap-4 border-solid border-2 border-blue-400 rounded-md'
        >
          <textarea
            value={question}
            onChange={textValidate}
            placeholder='Irukaraへの質問を書いてください'
            className='w-full border-none outline-none px-4 py-2 text-base resize-none'
          />
          <div className='absolute bottom-0 right-0 flex justify-end mr-2 mb-1 bg-white'>
            <button className='text-white bg-blue-500 text-xl p-1 rounded-full'>
              <FaAngleDoubleRight className='text-right' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
