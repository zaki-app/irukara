'use client';

import { COOKIE_NAME } from '@/common/constants';
import { API } from '@/common/constants/path';
import { currentUnix } from '@/common/libs/dateFormat';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState } from '@/store';
import { HistoryDataMessageRes, MessageType } from '@/types/message';
import { Message } from 'ai/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * GenerateAreaで生成されたChatGptのやりとりを表示する
 * @param  ユーザーとIrukaraのやり取り
 * @param type 1が今日、2が7日間
 * @returns
 */
export default function ChatGpt({
  messages,
  type,
  historyData,
}: {
  messages?: Message[];
  historyData?: HistoryDataMessageRes;
  type: number;
}) {
  console.log('このメッセージは何？', messages, historyData);

  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );
  const [numToday, setToday] = useState<number>(0);
  const [todayMessages, setTodayMessages] = useState<MessageType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
    const path = API.RELAY_GET_MSG.replace('{:userId}', userId)
      .replace('{:type}', 'DATE')
      .replace('{:target}', '0');
    const res = await fetch(path);
    if (res.ok) {
      const todayData = await res.json();
      console.log('today data...', todayData.count);
      // 今日のメッセージを格納
      setTodayMessages(todayData.data);
      setToday(todayData.count);
    } else {
      console.log('today data fetch error...', res);
    }
  }

  useEffect(() => {
    if (selectedMenu === 0 && type === 1) {
      (async () => {
        console.log('useEffect1');
        await getTodayMessage();
        console.log('useEffect2 ここになったらデータが表示される');
        setLoaded(true);
      })();
    } else if (type === 2 && historyData) {
      setTodayMessages(historyData?.data);
      setToday(historyData?.count);
      setLoaded(true);
    }
  }, []);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numToday > 0 ? (
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
          {messages &&
            messages.map((message: Message) => (
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
      ) : (
        <InputPrompt type={1} />
      )}
    </div>
  );
}
