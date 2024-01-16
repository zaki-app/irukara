'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useSelector } from 'react-redux';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { returnSevenDays, returnToday } from '@/common/libs/dateFormat';
import { PAGE_LINK } from '@/common/constants/path';
import { authSignOut } from '@/common/libs/nextauth';
import SidebarCard from '../../atoms/ui/card/SidebarCard';

interface ReturnDays {
  key: number;
  day: string;
  start: number;
  end: number;
}

/**
 * マイページのサイドバー
 * @returns
 */
export default function Sidebar() {
  const { isSidebar, isHeaderAction } = useSelector(
    (state: RootState) => state.sidebarSlice,
  );
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [sevenDays, setSevenDays] = useState<ReturnDays[]>();
  const [today, setToday] = useState<ReturnDays>();

  useEffect(() => {
    setToday(returnToday());
    setSevenDays(returnSevenDays());
  }, []);

  return (
    // 背景
    <aside
      className={`fixed top-[4rem] h-screen left-0 z-[10] overflow-hidden mb-[100px] ${
        isHeaderAction
          ? `visible bg-black/10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0 duration-0`
          : 'invisible md:visible'
      } ${isSidebar ? 'w-full  md:w-[240px]' : 'w-[0] md:w-[48px]'}`}
    >
      {/* サイドバー */}
      <nav
        className={`absolute left-0 top-0 pt-4 pb-[170px] overflow-y-auto w-0 md:w-[240px] flex flex-col gap-4 bg-neutral-100 border-r border-neutral-300 shadow-sm h-full transition-all px-4 ${
          isHeaderAction
            ? 'w-[300px] md:w-[240px] left-0 duration-300'
            : '-left-full md:w-[240px] duration-300'
        }`}
      >
        {/* share */}
        <div>
          <p
            className={`${
              isSidebar ? 'text-xs text-blue-400 font-semibold' : 'hidden'
            }`}
          >
            share
          </p>
          <SidebarCard path='/' text='共有エリア' type={1} />
          <SidebarCard path='/' text='マイ共有データ' type={1} />
        </div>
        {/* today */}
        <div>
          <p
            className={`${
              isSidebar ? 'text-xs text-blue-400 font-semibold' : 'hidden'
            }`}
          >
            today
          </p>
          <SidebarCard path='/' text={today?.day as string} type={2} />
        </div>
        <div>
          <p
            className={`${
              isSidebar ? 'text-xs text-blue-400 font-semibold' : 'hidden'
            }`}
          >
            history 7 days
          </p>
          <ul>
            {sevenDays?.map((day) => (
              <li key={day.key} className='cursor-pointer'>
                <SidebarCard
                  path={`/history/${selectedMenu}and${day.start}and${day.end}`}
                  type={3}
                  text={day.day}
                />
              </li>
            ))}
          </ul>
          <button>more...</button>
        </div>
        <div>
          <p
            className={`${
              isSidebar ? 'text-xs text-blue-400 font-semibold' : 'hidden'
            }`}
          >
            account
          </p>
          <SidebarCard path={PAGE_LINK.PROFILE} text='プロフィール' type={4} />
          <SidebarCard path={PAGE_LINK.PLAN} text='プラン変更' type={5} />
          <SidebarCard
            text='サインアウト'
            type={6}
            onClick={async () => authSignOut()}
          />
        </div>
      </nav>
      <div className='fixed bottom-[3rem] left-[]'>
        {/* PC用 */}
        <div className='invisible md:visible'>
          <FaAngleDoubleLeft
            className={`bg-blue-500 text-white text-3xl rounded-full p-1 border shadow-sm cursor-pointer ${
              !isSidebar && 'rotate-180'
            }`}
            onClick={() => {
              store.dispatch(setSidebar({ isSidebar: !isSidebar }));
            }}
          />
        </div>
      </div>
    </aside>
  );
}
