'use client';

import { fetchImages } from '@/common/libs/fetchImage';
import { SaveMessageData } from '@/common/types/LineTypes';
import TextChatContents from '@/components/server/mypage/TextChatContents';
import { useEffect, useState } from 'react';

interface TabMenuContentsProps {
  textChat: {
    count: number;
    data: SaveMessageData[];
  };
}

export default function TabMenuContents({ textChat }: TabMenuContentsProps) {
  console.log('タブです', textChat);
  const [tab, setTab] = useState<number>(0);
  const [textChatCount, setChatCount] = useState<number>(0);
  const [textData, setTextData] = useState<SaveMessageData[]>([]);
  const tabMenu = ['テキストチャット', 'イラスト', 'リアル'];

  async function clickTab(tabNumber: number) {
    setTab(tabNumber);
  }

  useEffect(() => {
    setChatCount(textChat.count);
    setTextData(textChat.data);
  }, []);

  return (
    <div className='w-full'>
      <ul className='flex mb-4'>
        {tabMenu.map((item, index) => (
          <li className='mr-4' key={item} onClick={() => clickTab(index)}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {tab === 0 && (
          <div>
            {textChatCount > 0 && textData.length > 0 ? (
              textData.map((item) => (
                <div key={item.messageId}>
                  <div>{item.question}</div>
                  <div>{item.answer}</div>
                  <div>{item.createdAt}</div>
                </div>
              ))
            ) : (
              <div>データが見つかりません</div>
            )}
          </div>
        )}
        {tab === 1 && <div>イラストデータが表示されます</div>}
        {tab === 2 && <div>リアルデータが表示されます</div>}
      </ul>
    </div>
  );
}
