'use client';

import { useEffect, useState } from 'react';
import { store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import { PLAN } from '@/common/constants';
import { LINK_PATH } from '@/common/constants/path';
import Link from 'next/link';
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
    <main className='relative h-full w-full flex-1 overflow-auto transition-width'>
      <div className='flex flex-col h-full'>
        <div className='kotei'>
          {/* プラン(固定) */}
          <div className='flex bg-red-200 justify-between items-center py-4'>
            <button>{PLAN[data.status]}</button>
            <button>
              <Link href={LINK_PATH.MEMBER}>プラン変更</Link>
            </button>
          </div>
          {/* <Plan userData={data} /> */}
          {/* タブ */}
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
        <div className='bg-orange-100 h-full flex flex-col overflow-y-auto'>
          {selectedTab.children}
        </div>
      </div>
    </main>
  );
}
