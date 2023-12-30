'use client';

import { useEffect, useState } from 'react';
import { store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import CSSTabs from '../../atoms/tab/CSSTabs';

/**
 * 各生成切り替えのタブ
 */
export default function GenerateArea({ data }: { data: GetUserIdRes }) {
  useEffect(() => {
    // userIdとstatusをreduxへ
    store.dispatch(
      setAuthUserData({
        userId: data.userId,
        status: data.status,
      }),
    );
  }, []);

  const [hookProps] = useState({
    tabs: [
      {
        id: 0,
        key: 1,
        label: 'チャット(GPT3.5)',
        children: <ChatGpt />,
      },
      {
        id: 1,
        key: 2,
        label: 'チャット(GPT4)',
        children: 'tab2',
      },
      {
        id: 2,
        key: 3,
        label: 'イラスト',
        children: 'tab3',
      },
      {
        id: 3,
        key: 4,
        label: 'リアル',
        children: 'tab4',
      },
    ],
    initialTabKey: 1,
  });

  const { tabProps, selectedTab } = useTabs(hookProps);

  return (
    <main className='relative h-full w-full flex-1 transition-width overflow-hidden'>
      <div className='flex flex-col h-full'>
        <div className=''>
          {/* プラン(固定) */}
          <Plan userData={data} />

          {/* tab header(固定) */}
          <div>
            <CSSTabs
              tabs={tabProps.tabs}
              selectedTabIndex={tabProps.selectedTabIndex}
              setSelectedTab={tabProps.setSelectedTab}
            />
          </div>
        </div>
        {/* tab body(scroll) */}
        <div className='h-full flex flex-col overflow-y-auto'>
          {selectedTab.children}
        </div>
      </div>
    </main>
  );
}
