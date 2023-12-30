'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
import { RESPONSIVE } from '@/common/constants';

export default function Sidebar() {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { key } = useSelector((state: RootState) => state.tabsKeySlice);

  const [isOpen, setOpen] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [widthSize, setWidthSize] = useState<number>(250);
  const [heigthSize, setHeightSize] = useState<number>(0);

  function toggleSidebar() {
    store.dispatch(setSidebar({ isSidebar: !isSidebar }));

    setOpen(!isOpen);
  }

  function setScreenDimensions() {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);

    if (screenWidth < RESPONSIVE.MD) {
      setWidthSize(45);
    }
  }

  useEffect(() => {
    console.log(setScreenDimensions());
    // resize
    window.addEventListener('resize', setScreenDimensions);

    return () => {
      window.removeEventListener('resize', setScreenDimensions);
    };
  }, []);

  return (
    <aside
      className={`absolute overflow-hidden h-full border-r-blue-500 duration-200 ease-in-out ${
        isOpen ? 'w-[250px]' : 'w-[42px]'
      }`}
    >
      <nav className='absolute md:static h-full flex-shrink-0 bg-neutral-100'>
        {/* icon */}
        <div className='fixed cursor-pointer'>
          {isSidebar ? (
            // open
            <>
              <FaAngleDoubleLeft onClick={() => toggleSidebar()} />
              <p>閉じている</p>
              <p>
                {screenWidth} {screenHeight}
              </p>
            </>
          ) : (
            // close
            <>
              <FaAngleDoubleRight onClick={() => toggleSidebar()} />
              <p>開いている</p>
              <p>
                {screenWidth} {screenHeight}
              </p>
            </>
          )}
        </div>
      </nav>
    </aside>
  );
}
