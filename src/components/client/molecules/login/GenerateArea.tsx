'use client';

import { useEffect, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import { BsFillChatDotsFill, BsWechat } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { setMenuArea } from '@/store/ui/menu/slice';
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
    <main className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
      <div className='absolute z-[2] top-[0] left-0 bg-orange-200 w-full flex flex-col h-[33px]'>
        <div>
          <h2>現在は、チャットモードです。</h2>
        </div>
      </div>
      <div className='w-full h-full flex-1 overflow-y-auto z-[1] pt-[40px] mb-[120px]'>
        {/* {selectedTab.children} */}
        <ChatGpt />
      </div>
      {/* bottom tab */}
      {isMenu && (
        <div className='absolute z-[2] w-full bottom-[50px] left-0 h-[60px]'>
          <MenuTab
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          />
        </div>
      )}
      {/* 生成textarea */}
      <div className='absolute z-[2] w-full h-[60px] bottom-[30px] left-0 flex bg-red-300'>
        <div
          className='mr-4 ml-2 text-2xl text-blue-500 cursor-pointer'
          onClick={() => {
            console.log('メニューの状態', isMenu);
            store.dispatch(setMenuArea({ isMenu: !isMenu }));
          }}
        >
          {isMenu ? <TbTriangleInvertedFilled /> : <TbTriangleFilled />}
        </div>
        <textarea className='w-full flex-1' />
      </div>
      <div className='fixed overflow-hidden bottom-0 right-0 w-full z-[12] h-[30px]'>
        <div className='bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
          <span>
            Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
          </span>
        </div>
      </div>
    </main>
  );
}
