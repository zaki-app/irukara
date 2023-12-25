'use client';

import { useEffect, useState } from 'react';
import { store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import CSSTabs from '../../atoms/tab/CSSTabs';

type Tab = { key: number; label: string; id: number };

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
    <div className='h-full flex flex-col px-8 flex-1'>
      <Plan userData={data} />
      {/* タブ */}
      <div className='w-full mt-4'>
        {/* tab header */}
        <div>
          <CSSTabs
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          />
        </div>
        {/* tab body */}
        <div className='bg-orange-100 overflow-hidden'>
          {selectedTab.children}
        </div>
      </div>
    </div>
  );
}
