'use client';

import { TAB_LIST } from '@/common/config/site.config';
import { useState } from 'react';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import { UserStatusProps } from './UserStatus';

export default function GenerateArea({ data }: { data: UserStatusProps }) {
  const [numTab, setTab] = useState<number>(1);

  console.log('ユーザー情報', data);

  function selectTab(type: number) {
    console.log('選択タブ', type);
    setTab(type);
  }

  return (
    <div className='h-full flex flex-col px-8'>
      <Plan userData={data} />
      <div className='w-full flex-1 flex flex-col'>
        <div className='text-sm font-medium text-center'>
          <ul className='flex -mb-px cursor-pointer whitespace-nowrap overflow-x-auto'>
            {TAB_LIST.map((tab) => (
              <li
                key={tab.key}
                className={`p-4 border-b-2 rounded-t-lg mb-4 hover:opacity-80 ${
                  numTab === tab.key &&
                  'text-blue-600 border-b-3 border-blue-600'
                }`}
                onClick={() => selectTab(tab.key)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1'>
          {/* タイプ別にコンポーネントを分岐 */}
          {numTab === 1 && <ChatGpt />}
          {numTab === 2 && <ChatGpt />}
          {numTab === 3 && (
            <>
              <p>イラストモードのコンポーネントが入る</p>
            </>
          )}
          {numTab === 4 && (
            <>
              <p>リアルモードのコンポーネントが入る</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
