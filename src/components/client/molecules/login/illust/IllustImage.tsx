'use client';

import { API } from '@/common/constants/path';
import { currentUnix } from '@/common/libs/dateFormat';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import ImageOutput from '@/components/client/atoms/login/chat/ImageOutput';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { ImageTableRes } from '@/types/image';
import { useEffect, useState } from 'react';

/**
 * イラスト生成のやりとりを表示する
 * @returns
 */
export default function IllustImage() {
  const [numToday, setToday] = useState<number>(0);
  const [todayIllusts, setTodayIllusts] = useState<ImageTableRes[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const path = API.RELAY_GET_IMAGE.replace('{:type}', 'DATE')
      .replace('{:target}', '0')
      .replace('{:imageType}', '1');
    const res = await fetch(path);
    if (res.ok) {
      const todayData = await res.json();
      console.log('today data...', todayData.count);
      // 今日のイラスト画像を格納
      setTodayIllusts(todayData.data);
      setToday(todayData.count);
    } else {
      console.log('today data fetch error...', res);
    }
  }

  useEffect(() => {
    (async () => {
      console.log('illust useEffect1');
      await getTodayMessage();
      console.log('illust useEffect2 ここになったらデータが表示される');
      setLoaded(true);
    })();
  }, []);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numToday > 0 ? (
        <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
          <div className='flex flex-col-reverse'>
            {todayIllusts.map((today) => (
              <div key={today.imageId}>
                {/* ユーザー */}
                <UserCard question={today.prompt} createdAt={today.createdAt} />
                {/* Irukara */}
                <ImageOutput
                  prompt={today.prompt}
                  output={today.outputUrl}
                  createdAt={today.createdAt}
                />
              </div>
            ))}
          </div>
          {/* 追加のやり取り */}
          {/* {message.map((message: Message) => (
            <ScrollBottom option key={message.id}>
              {message.role === 'user' && (
                <UserCard
                  question={message.content}
                  createdAt={currentUnix()}
                />
              )}
              {message.role === 'assistant' && (
                <div>
                  <AiCard answer={message.content} createdAt={currentUnix()} />
                </div>
              )}
            </ScrollBottom>
          ))} */}
        </ScrollBottom>
      ) : (
        <InputPrompt type={3} />
      )}
    </div>
  );
}
