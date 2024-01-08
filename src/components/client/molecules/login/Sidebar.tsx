'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useSelector } from 'react-redux';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { returnSevenDays, returnToday } from '@/common/libs/dateFormat';
import Link from 'next/link';

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
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      className={`fixed top-[5.5rem] h-screen left-0 z-[10] overflow-hidden transition-all ${
        isHeaderAction
          ? `visible bg-black/10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0 duration-0`
          : 'invisible md:visible'
      } ${isSidebar ? 'w-full  md:w-[240px]' : 'w-[0] md:w-[48px]'}`}
    >
      {/* サイドバー */}
      <nav
        className={`w-0 md:w-[240px] bg-neutral-100 border-r border-neutral-300 shadow-sm h-full transition-all ${
          isHeaderAction
            ? 'w-[300px] md:w-[240px] left-0 duration-300'
            : '-left-full md:w-[240px] duration-300'
        }`}
      >
        <div>
          <div>
            今日の
            {selectedMenu === 0 && 'ChatGpt3.5'}
            {selectedMenu === 1 && 'ChatGpt4.0'}
            {selectedMenu === 2 && 'イラスト画像生成'}
            {selectedMenu === 3 && 'リアル画像生成'}
          </div>
          <div>{today?.day}</div>
          <div>
            <h2>過去7日間の履歴</h2>
          </div>
          <ul>
            {sevenDays?.map((day) => (
              <li key={day.key} className='cursor-pointer'>
                <Link
                  href={`/history/${selectedMenu}and${day.start}and${day.end}`}
                >
                  {day.day}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
      </nav>
    </aside>
  );
}
