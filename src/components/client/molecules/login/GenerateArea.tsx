'use client';

import { useEffect, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import { BsFillChatDotsFill, BsWechat } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import CSSTabs from '../../atoms/tab/CSSTabs';
import BottomTab from '../../atoms/tab/BottomTab';

/**
 * 各生成切り替えのタブ
 */
export default function GenerateArea({ data }: { data: GetUserIdRes }) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

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
        label: 'GPT3.5',
        icon: <BsFillChatDotsFill />,
        children: <ChatGpt />,
      },
      {
        id: 1,
        key: 2,
        label: 'GPT4.0',
        icon: <BsWechat />,
        children: 'tab2',
      },
      {
        id: 2,
        key: 3,
        label: 'イラスト',
        icon: <BsWechat />,
        children: 'tab3',
      },
      {
        id: 3,
        key: 4,
        label: 'リアル',
        icon: <BsWechat />,
        children: 'tab4',
      },
    ],
    initialTabKey: 1,
  });

  const { tabProps, selectedTab } = useTabs(hookProps);
  console.log(tabProps, selectedTab);

  return (
    <main className='relative h-full w-full flex-1 transition-width overflow-hidden'>
      <div className='flex flex-col h-full'>
        <div className=''>
          {/* プラン(固定) */}
          <Plan userData={data} />

          {/* tab header(固定) */}
          {/* <div>
            <CSSTabs
              tabs={tabProps.tabs}
              selectedTabIndex={tabProps.selectedTabIndex}
              setSelectedTab={tabProps.setSelectedTab}
            />
          </div> */}
        </div>
        {/* tab body(scroll) */}
        <div className='h-full flex flex-col overflow-y-auto'>
          {selectedTab.children}
        </div>
        {/* bottom tab */}
        <div className='fixed overflow-hidden bottom-0 right-0 w-full'>
          {/* <BottomTab
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          /> */}
          <div className='bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
            <span>
              Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
            </span>
          </div>
        </div>
        {/* <div className='bottom'>
          <CSSTabs
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          />
        </div> */}
      </div>
    </main>
  );
}
