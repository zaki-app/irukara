'use client';

import { useState } from 'react';

export default function TabMenuContents({ data }: any) {
  console.log('タブ', data);
  const [tab, setTab] = useState<number>(0);
  const tabName = ['テキスト', 'イラスト', 'リアル'];

  return (
    <div className='my-4'>
      <div>
        {tabName.map((name, index) => (
          <button
            // className={`mr-4 ${tab === index ? 'bg-green-500' : ''}`}
            key={tab}
            onClick={() => setTab(index)}
          >
            {name}
          </button>
        ))}
      </div>
      {/* コンテンツ */}
      {tab === 0 && <div>テキストちゃっとコンポーネント</div>}
      {tab === 1 && <div>イラスト一覧表示コンポーネント</div>}
      {tab === 2 && <div>リアル画像一覧表示コンポーネント</div>}
    </div>
  );
}
