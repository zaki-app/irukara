'use client';

import { RootState } from '@/store';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../molecules/login/Sidebar';
import CautionText from '../atoms/login/CautionText';

export default function PrimaryWrapper({
  type,
  children,
}: {
  type: number;
  children: ReactNode;
}) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <>
      {type === 1 && (
        <div className='relative z-0 flex h-full w-full overflow-hidden'>
          <Sidebar />
          <div className='relative flex flex-1 h-full w-full flex-col overflow-hidden z-[8]'>
            <div className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
              <div
                className={`fixed w-full h-full flex-1 z-[1] overflow-y-auto top-[5.5rem] right-0 pb-[8rem] ${
                  isSidebar
                    ? 'md:w-[calc(100%-240px)]'
                    : 'md:w-[calc(100%-48px)]'
                }`}
              >
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
    </>
  );
}
