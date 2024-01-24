'use client';

import { RootState } from '@/store';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../molecules/login/Sidebar';
import CautionText from '../atoms/login/CautionText';

export default function PrimaryWrapper({
  type,
  children,
  isScroll,
}: {
  type: number;
  children: ReactNode;
  isScroll?: boolean;
}) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <>
      {type === 1 && (
        <div className='flex h-full w-full overflow-hidden'>
          <Sidebar />
          <div className='relative flex flex-1 h-full w-full flex-col overflow-hidden z-[8]'>
            <div className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
              <div className='fixed w-full h-full flex-1 z-[1] overflow-y-auto top-[5.5rem] right-0 pb-[8rem]'>
                {children}
              </div>
            </div>
          </div>
          <CautionText />
        </div>
      )}
      {/* generation area */}
      {type === 2 && (
        <div className='relative flex flex-1 h-full w-full flex-col overflow-hidden z-[8]'>
          <Sidebar />
          {children}
          <CautionText />
        </div>
      )}
      {/* sidebarを使用するコンテンツ */}
      {type === 3 && (
        <div className='relative flex flex-1 w-full h-full'>
          <Sidebar />
          <div
            className={`${
              isSidebar
                ? 'absolute w-[calc(100%-240px)] left-[240px]'
                : 'w-full'
            } ${
              isScroll ? 'overflow-y-auto' : 'overflow-hidden'
            } h-full py-10 px-4`}
          >
            {children}
          </div>
          <CautionText />
        </div>
      )}
    </>
  );
}
