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
import ChatTextArea from '../../atoms/login/chat/ChatTextArea';
import MenuTab from '../../atoms/tab/MenuTab';

/**
 * 各生成エリア
 */
export default function GenerateArea({ data }: { data: GetUserIdRes }) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { isMenu } = useSelector((state: RootState) => state.menuSlice);

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
      {/* <div className='flex flex-col h-full w-full'> */}
      {/* <div className=''>
          {/* プラン(固定) */}
      {/* <Plan userData={data} /> */}

      {/* tab header(固定) */}
      {/* <div>
            <CSSTabs
              tabs={tabProps.tabs}
              selectedTabIndex={tabProps.selectedTabIndex}
              setSelectedTab={tabProps.setSelectedTab}
            />
          </div> */}
      {/* </div> */}
      {/* tab body(scroll) */}
      <div className='w-full h-full overflow-y-auto flex flex-col'>
        {/* {selectedTab.children} */}
        <ChatGpt />
      </div>
      {/* 現在のモード */}
      <div className='absolute top-0 left-0 bg-orange-200 w-full flex flex-col'>
        <Plan userData={data} />
        <div>
          <h2>現在は、チャットモードです。</h2>
        </div>
      </div>
      {/* bottom tab */}
      {isMenu && (
        <div className='absolute w-full bottom-[7rem] left-0'>
          <MenuTab
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          />
        </div>
      )}
      <div className='fixed overflow-hidden bottom-0 right-0 w-full z-[12]'>
        <div className='bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
          <span>
            Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
          </span>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
