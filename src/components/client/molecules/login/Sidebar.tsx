'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

export default function Sidebar() {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { key } = useSelector((state: RootState) => state.tabsKeySlice);

  const [miniSide, setMiniSide] = useState<number>(45);
  const [longSide, setLongSide] = useState<number>(250);

  function toggleSidebar(type: number) {
    store.dispatch(setSidebar({ isSidebar: !isSidebar }));

    if (type === 1) {
      setMiniSide(250);
      setLongSide(250);
    } else if (type === 2) {
      setMiniSide(45);
      setLongSide(45);
    }
  }

  return (
    <aside
      className={`absolute md:static top-0 left-0 z-[12] bg-red-200 w-[${miniSide.toString()}px] md:w-[${longSide.toString()}px] h-full overflow-hidden duration-200 ease-out`}
    >
      <nav className='h-full flex-shrink-0 overflow-x-hidden bg-neutral-100 border-r'>
        {/* icon */}
        <div className='cursor-pointer'>
          {isSidebar ? (
            // 開いている
            <FaAngleDoubleLeft onClick={() => toggleSidebar(1)} />
          ) : (
            // 閉じている
            <FaAngleDoubleRight onClick={() => toggleSidebar(2)} />
          )}
        </div>
      </nav>
    </aside>
  );
}
