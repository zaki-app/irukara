'use client';

import { API } from '@/common/constants/path';
import { currentUnix } from '@/common/libs/dateFormat';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { MessageType } from '@/types/message';
import { Message } from 'ai/react';
import { useEffect, useMemo, useState } from 'react';

/**
 * GenarateAreaで生成されたChatGptのやりとりを表示する
 * @param  ユーザーとIrukaraのやり取り
 * @returns
 */
export default function ChatGpt({ messages }: { messages: Message[] }) {
  const [numToday, setToday] = useState<number>(0);
  const [todayMessages, setTodayMessages] = useState<MessageType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

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

  useMemo(() => {
    (async () => {
      console.log('useEffect1');
      await getTodayMessage();
      console.log('useEffect2 ここになったらデータが表示される');
      setLoaded(true);
    })();
  }, []);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numToday > 0 ? (
        <>
          <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
            <div className='flex flex-col-reverse'>
              {todayMessages.map((today) => (
                <div key={today.messageId}>
                  {/* ユーザー */}
                  <UserCard
                    question={today.question}
                    createdAt={today.createdAt}
                  />
                  {/* Irukara */}
                  <AiCard answer={today.answer} createdAt={today.createdAt} />
                </div>
              ))}
            </div>
            {/* 追加のやり取り */}
            {messages.map((message: Message) => (
              <ScrollBottom option key={message.id}>
                {message.role === 'user' && (
                  <UserCard
                    question={message.content}
                    createdAt={currentUnix()}
                  />
                )}
                {message.role === 'assistant' && (
                  <div>
                    <AiCard
                      answer={message.content}
                      createdAt={currentUnix()}
                    />
                  </div>
                )}
              </ScrollBottom>
            ))}
          </ScrollBottom>
        </>
      ) : (
        <InputPrompt type={1} />
      )}
    </div>
  );
}
