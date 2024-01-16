'use client';

// import { COOKIE_NAME } from '@/common/constants';
// import { API } from '@/common/constants/path';
import { currentUnix } from '@/common/libs/dateFormat';
// import { getCookie } from '@/common/utils/cookie/manageCookies';
// import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState, store } from '@/store';
import { setSpinner } from '@/store/ui/spinner/slice';
import { HistoryDataMessageRes, MessageType } from '@/types/message';
import { Message } from 'ai/react';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * GenerateAreaで生成されたChatGptのやりとりを表示する
 * @param  ユーザーとIrukaraのやり取り
 * @param type 1が今日、2が7日間
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

  const [numDataCount, setDataCount] = useState<number>(0);
  const [dataMessages, setDataMessages] = useState<MessageType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  // async function getDataMessage() {
  //   const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  //   const path = API.RELAY_GET_MSG.replace('{:userId}', userId)
  //     .replace('{:type}', 'DATE')
  //     .replace('{:target}', '0');
  //   console.log('中間', path);
  //   const res = await fetch(path);
  //   if (res.ok) {
  //     const todayData = await res.json();
  //     console.log('today data...', todayData.count);
  //     // 今日のメッセージを格納
  //     setDataMessages(todayData.data);
  //     setDataCount(todayData.count);
  //   } else {
  //     console.log('today data fetch error...', res);
  //   }
  // }

  useEffect(() => {
    if (selectedMenu === 0 && type === 1) {
      store.dispatch(setSpinner({ isSpinner: true }));
      setDataMessages(todayData as MessageType[]);
      setDataCount(todayData?.length as number);
      setLoaded(true);
      store.dispatch(setSpinner({ isSpinner: false }));
      // })();
    } else if (type === 2 && historyData) {
      store.dispatch(setSpinner({ isSpinner: true }));
      setDataMessages(historyData?.data);
      setDataCount(historyData?.count);
      setLoaded(true);
      store.dispatch(setSpinner({ isSpinner: false }));
    }
  }, [todayData]);

  return (
    <div className='relative w-full h-full'>
      {isLoaded ? (
        <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
          <div className='flex flex-col-reverse'>
            {dataMessages?.map((data) => (
              <div key={data.messageId} className='test'>
                {/* ユーザー */}
                <UserCard question={data.question} createdAt={data.createdAt} />
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
      ) : numDataCount <= 0 ? (
        // <InputPrompt type={1} />
        <p>今日のデータが見つかりません</p>
      ) : (
        <Spin />
      )}
    </div>
  );
}
