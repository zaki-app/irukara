'use client';

import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { useSelector } from 'react-redux';
import { FaAngleDoubleRight } from 'react-icons/fa';

/**
 * マイページのサイドバー
 * @returns
 */
export default function Sidebar() {
  const { isSidebar, isHeaderAction } = useSelector(
    (state: RootState) => state.sidebarSlice,
  );

  function toggleSidebar() {
    store.dispatch(setSidebar({ isSidebar: !isSidebar, isHeaderAction: true }));
  }

  return (
    <>
      <div
        className={`md:visible md:w-[240px] w-0 ${
          isHeaderAction ? 'visible' : 'invisible'
        } ${isSidebar ? 'md:w-[240px]' : 'md:w-[48px]'}`}
      >
        <aside
          className={`h-full relative w-[48px] md:w-[240px] ${
            isSidebar ? '' : 'w-[240px] md:w-[48px]'
          }`}
        >
          <nav
            className={`absolute z-[12] left-0 top-0 bg-blue-200 border-r-2 h-full duration-200 ease-linear ${
              isSidebar ? 'w-[48px] md:w-[240px]' : 'w-[240px] md:w-[48px]'
            }`}
          >
            <div className='py-4 pl-2 overflow-hidden'>
              <button
                className='bg-neutral-100 rounded-lg py-2 px-4 font-semibold hidden md:block'
                onClick={() => toggleSidebar()}
              >
                {isSidebar ? <FaAngleDoubleRight /> : '縮小する'}
              </button>
              <div>
                <ul>
                  <li>12/30</li>
                  <li>12/29</li>
                  <li>12/28</li>
                  <li>12/27</li>
                  <li>12/26</li>
                  <li>12/25</li>
                  <li>12/24</li>
                </ul>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
