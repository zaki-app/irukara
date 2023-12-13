'use client';

import { Tabs, TabsProps } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { TAB_LIST } from '@/common/config/site.config';
import { useState } from 'react';
import SectionWrapper from '../../template/SectionWrapper';
import ChatGpt from './chatgpt/ChatGpt';
import IllustImage from './illust/IllustImage';
import RealImage from './real/RealImage';
import Plan from '../../atoms/login/Plan';

export default function GenerateArea() {
  const [numTab, setTab] = useState<number>(1);

  function selectTab(type: number) {
    console.log('選択タブ', type);
    setTab(type);
  }

  return (
    // <SectionWrapper colorName='section-white' styleName='section-top'>
    <div className='h-full flex flex-col px-8'>
      <div className='bg-slate-300'>
        <Plan />
      </div>
      {/* <div className='flex-1 bg-line'>
        <Tabs items={items} className='h-full' />
      </div> */}
      <div className='flex-1 flex flex-col'>
        <div className='text-sm font-medium text-center text-gray-600 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
          <ul className='flex -mb-px cursor-pointer overflow-x-auto'>
            {TAB_LIST.map((tab) => (
              <li
                key={tab.key}
                className={`inline-block p-4 border-b-2 rounded-t-lg mb-4 hover:opacity-80 ${
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
        <div className='bg-red-300 flex-1'>
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
    // </div>
    // </SectionWrapper>
  );
}
