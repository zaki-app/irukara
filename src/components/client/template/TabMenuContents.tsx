'use client';

import { SaveMessageData, SaveMessageDataType } from '@/common/types/fetchData';
import { useEffect, useState } from 'react';
import ChatSaveList from '../organisms/mypage/ChatSaveList';
import ImageSaveList from '../organisms/mypage/ImageSaveList';

interface TabMenuContentsProps {
  textChat: SaveMessageDataType;
}

export default function TabMenuContents({ textChat }: TabMenuContentsProps) {
  const [tab, setTab] = useState<number>(0);
  const [textChatCount, setChatCount] = useState<number>(0);
  const [textData, setTextData] = useState<SaveMessageData[] | boolean>([]);

  const tabMenu = ['テキストチャット', 'イラスト', 'リアル'];

  function textChatTransition() {
    setChatCount(textChat.count);
    if (Array.isArray(textData)) {
      setTextData(textChat.data);
    }
  }

  async function clickTab(tabNumber: number) {
    setTab(tabNumber);

    // 急ぐ必要がない
    if (tabNumber === 0) {
      console.log('テキストチャット', tabNumber);
      textChatTransition();
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
        {tab === 1 && <ImageSaveList mode={1} />}
        {tab === 2 && <ImageSaveList mode={2} />}
      </div>
    </div>
  );
}
