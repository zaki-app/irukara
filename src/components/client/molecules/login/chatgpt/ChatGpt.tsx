'use client';

import { DATA, SELECT_MODE } from '@/common/constants';
import { currentUnix } from '@/common/libs/dateFormat';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState, store } from '@/store';
import { HistoryDataMessageRes, MessageType } from '@/types/message';
import { Message } from 'ai/react';
import { Spin, message } from 'antd';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * GenerateAreaで生成されたChatGptのやりとりを表示する
 *
 * @param todayData サーバー側で取得した今日のデータ一覧配列
 * @param messages 今日の新しく生成されたメッセージ
 * @param type 1が今日、2が7日間
 * @param newMessage 保存されたメッセージオブジェクト
 * @param historyData 過去の指定されたメッセージ配列
 * @returns
 */
export default function ChatGpt({
  todayData,
  messages,
  type,
  newMessage,
  historyData,
}: {
  todayData?: MessageType[];
  messages?: Message[];
  type: number;
  newMessage?: MessageType;
  historyData?: HistoryDataMessageRes;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [dataMessages, setDataMessages] = useState<MessageType[] | null>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [numMode, setMode] = useState<number>(100);
  const [isDiff, setDiff] = useState<boolean>(false);

  console.log(
    // todayData === dataMessages,
    'chatgpt props',
    // selectedMenu,
    todayData,
    dataMessages,
    // messages,
    // type,
    // newMessage,
    // historyData,
    // isLoaded,
  );

  const router = useRouter();

  useEffect(() => {
    // router.refresh();
    if (type === DATA.TODAY) {
      // 今日のデータ
      setDataMessages(todayData as MessageType[]);
    } else if (type === DATA.HISTORY && historyData) {
      // 履歴のデータ
      setDataMessages(historyData.data);
    }
    // }

    if (dataMessages) {
      setLoaded(true);
    }
  }, [todayData]);

  return (
    <>
      {console.log('HTMLレンダリング', isLoaded, dataMessages)}
      {isLoaded && dataMessages ? (
        <>
          {/* 今日のデータが１件以上ある場合 */}
          {dataMessages.length > 0 ? (
            <div className='relative w-full h-full'>
              <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
                <div className='flex flex-col-reverse'>
                  {dataMessages &&
                    dataMessages.map((data) => (
                      <div key={data.messageId} className='test'>
                        {/* ユーザー */}
                        <UserCard
                          question={data.question}
                          createdAt={data.createdAt}
                        />
                        {/* Irukara */}
                        <AiCard
                          answer={data.answer}
                          createdAt={data.createdAt}
                          messageId={data.messageId}
                          shareStatus={data.shareStatus}
                        />
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
                            createdAt={newMessage?.createdAt as number}
                            messageId={newMessage?.messageId}
                            shareStatus={newMessage?.shareStatus}
                          />
                        </div>
                      )}
                    </ScrollBottom>
                  ))}
              </ScrollBottom>
            </div>
          ) : (
            <InputPrompt type={selectedMenu} />
          )}
        </>
      ) : (
        <Spin />
      )}
    </>
  );
}
