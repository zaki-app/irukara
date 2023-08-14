'use client';

import {
  SaveImageData,
  SaveImageDataType,
  SaveMessageData,
  SaveMessageDataType,
} from '@/common/types/fetchData';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import ChatSaveList from '../organisms/mypage/ChatSaveList';

interface TabMenuContentsProps {
  textChat: SaveMessageDataType;
  illustImage: SaveImageDataType;
  realImage: SaveImageDataType;
}

export default function TabMenuContents({
  textChat,
  illustImage,
  realImage,
}: TabMenuContentsProps) {
  console.log('タブです', illustImage);

  const [tab, setTab] = useState<number>(0);
  const [textChatCount, setChatCount] = useState<number>(0);
  const [textData, setTextData] = useState<SaveMessageData[] | boolean>([]);
  const [illustCount, setIllustCount] = useState<number>(0);
  const [illustData, setIllustData] = useState<SaveImageData[] | boolean>([]);
  const [realCount, setRealCount] = useState<number>(0);
  const [realData, setRealData] = useState<SaveImageData[] | boolean>([]);

  const tabMenu = ['テキストチャット', 'イラスト', 'リアル'];

  function textChatTransition() {
    setChatCount(textChat.count);
    if (Array.isArray(textData)) {
      setTextData(textChat.data);
    }
  }

  function illustTransition() {
    setIllustCount(illustImage.count);
    setIllustData(illustImage.data);
  }

  function realTransition() {
    setRealCount(realImage.count);
    setRealData(realImage.data);
  }

  async function clickTab(tabNumber: number) {
    setTab(tabNumber);

    // 急ぐ必要がない
    if (tabNumber === 0) {
      console.log('テキストチャット', tabNumber);
      textChatTransition();
    } else if (tabNumber === 1) {
      console.log('イラスト画像', tabNumber);
      illustTransition();
    } else if (tabNumber === 2) {
      console.log('リアル画像', tabNumber);
      realTransition();
    }
  }

  useEffect(() => {
    textChatTransition();
  }, []);

  return (
    <div className='w-full'>
      <ul className='flex mb-4 border-b-4'>
        {tabMenu.map((item, index) => (
          <li
            className={`mr-4 cursor-pointer p-2 ${
              tab === index ? 'text-gray-500 font-bold' : 'text-gray-400'
            }`}
            key={item}
            onClick={() => clickTab(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div>
        {tab === 0 && Array.isArray(textData) && (
          <ChatSaveList textChatCount={textChatCount} textData={textData} />
        )}
        {tab === 1 && (
          <div>
            {illustCount > 0 && Array.isArray(illustData) ? (
              illustData.map((item) => (
                <div key={item.imageId}>
                  <Suspense fallback='イラスト画像関係をローディング'>
                    <div>{item.prompt}</div>
                    <Image
                      src={item.imageUrl}
                      alt='イラスト画像'
                      width={50}
                      height={50}
                    />
                  </Suspense>
                </div>
              ))
            ) : (
              <div>イラストデータが見つかりません</div>
            )}
          </div>
        )}
        {tab === 2 && (
          <div>
            {realCount > 0 && Array.isArray(realData) ? (
              realData.map((item) => (
                <div key={item.imageId}>
                  <Suspense fallback='イラスト画像関係をローディング'>
                    <div>{item.prompt}</div>
                    <Image
                      src={item.imageUrl}
                      alt='イラスト画像'
                      width={50}
                      height={50}
                    />
                  </Suspense>
                </div>
              ))
            ) : (
              <div>イラストデータが見つかりません</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
