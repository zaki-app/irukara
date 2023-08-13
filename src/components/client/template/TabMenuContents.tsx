'use client';

import TextChatContents from '@/components/server/mypage/TextChatContents';
import { useState } from 'react';

export default function TabMenuContents() {
  const [tab, setTab] = useState<number>(0);
  const tabMenu = ['テキストチャット', 'イラスト', 'リアル'];

  function clickTab(tabNumber: number) {
    setTab(tabNumber);
  }

  return (
    <div className='w-full'>
      <ul className='flex'>
        {tabMenu.map((item, index) => (
          <li key={item} onClick={() => clickTab(index)}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {tab === 0 && <div>テキストチャット</div>}
        {tab === 1 && <div>イラストデータが表示されます</div>}
        {tab === 2 && <div>リアルデータが表示されます</div>}
      </ul>
    </div>
  );
}
