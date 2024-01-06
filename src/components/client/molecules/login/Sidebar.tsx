'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

/**
 * マイページのサイドバー
 * @returns
 */
export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { isSidebar, isHeaderAction } = useSelector(
    (state: RootState) => state.sidebarSlice,
  );

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  function toggleSidebar() {
    store.dispatch(setSidebar({ isSidebar: !isSidebar, isHeaderAction: true }));
  }

  // sidebar以外の場所をクリックしたら閉じる
  function clickOutSide(event: MouseEvent) {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      // store.dispatch(setSidebar({ isSidebar, isHeaderAction: false }));
      // console.log('クリックされました', isSidebar, isHeaderAction);
      // setSidebarOpen(!isSidebarOpen);
      // if (!isHeaderAction) {
      //   setSidebarOpen(true);
      // }
      if (!isHeaderAction) {
        setSidebarOpen(true);
        console.log('isHeaderAction', true);
      } else {
        console.log('isHeaderAction', false);
        setSidebarOpen(false);
      }
    }
  }

  // useEffect(() => {
  //   document.addEventListener('click', clickOutSide);

  //   return () => {
  //     document.removeEventListener('click', clickOutSide);
  //   };
  // }, []);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      // clickOutSide(e);
    });

    return () => {
      document.removeEventListener('click', (e) => {
        // clickOutSide(e);
        console.log('アンマウントです');
        // setSidebarOpen(false);
      });
    };
  }, []);

  return (
    <aside
      className={`absolute top-0 left-0 z-[10] w-full h-full md:bg-transparent overflow-hidden ${
        isHeaderAction ? 'bg-black/10 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className={`md:w-[240px] h-full bg-blue-100 pt-[3rem] overflow-hidden ${
          isHeaderAction
            ? 'visible absolute top-0 left-0 w-[300px] z-[10] duration-300 ease-in-out'
            : 'w-0 invisible md:visible duration-300 ease-out'
        }`}
      >
        <div className='w-full h-full flex flex-coll'>
          <p>サイドバーです</p>
        </div>
      </nav>
    </aside>
    // <div
    //   className={`absolute top-0 left-0 z-[10] h-full overflow-hidden md:overflow-auto ${
    //     isHeaderAction
    //       ? ` w-full ${
    //           isSidebar ? 'md:w-[240px]' : 'md:w-[48px]'
    //         } bg-black/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-0`
    //       : ''
    //   }`}
    //   ref={sidebarRef}
    // >
    //   <div
    //     className={`md:visible md:w-[240px] w-0 h-full ${
    //       isHeaderAction ? 'visible' : 'invisible'
    //     } ${isSidebar ? 'md:w-[240px]' : 'md:w-[48px]'}`}
    //   >
    //     <aside className='h-full w-full overflow-hidden'>
    //       <nav
    //         className={`fixed z-[12] left-0 top-0 overflow-hidden bg-blue-50 border-r-2 h-full duration-200 ease-linear ${
    //           isSidebar ? 'w-[48px] md:w-[240px]' : 'w-[240px] md:w-[48px]'
    //         }`}
    //       >
    //         <div className='px-4 h-full w-full overflow-hidden'>
    //           <ul>
    //             <li>12/30</li>
    //             <li>12/29</li>
    //             <li>12/28</li>
    //             <li>12/27</li>
    //             <li>12/26</li>
    //             <li>12/25</li>
    //             <li>12/24</li>
    //           </ul>
    //           <button
    //             className='bg-neutral-100 rounded-lg py-2 px-4 font-semibold hidden md:block'
    //             onClick={() => toggleSidebar()}
    //           >
    //             {isSidebar ? '縮小する' : <FaAngleDoubleRight />}
    //           </button>
    //         </div>
    //       </nav>
    //     </aside>
    //   </div>
    // </div>
  );
}
