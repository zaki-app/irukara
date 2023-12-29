'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

export default function Sidebar() {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { key } = useSelector((state: RootState) => state.tabsKeySlice);

  const [isOpen, setOpen] = useState<boolean>(true);
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
    <aside className='relative overflow-hidden w-[45px] h-full duration-200 ease-in-out'>
      <nav className='fixed h-full flex-shrink-0 bg-neutral-100 border-r'>
        {/* icon */}
        <div className='cursor-pointer fixed '>
          {isSidebar ? (
            // open
            <>
              <FaAngleDoubleLeft onClick={() => toggleSidebar(1)} />
              <p>閉じている</p>
            </>
          ) : (
            // close
            <>
              <FaAngleDoubleRight onClick={() => toggleSidebar(2)} />
              <p>開いている</p>
            </>
          )}
        </div>
      </nav>
    </aside>
  );
}
