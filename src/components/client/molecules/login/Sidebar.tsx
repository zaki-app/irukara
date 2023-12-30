'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setOpen(!isOpen);
  }

  return (
    <aside
      className={`h-full relative w-[48px] md:w-[240px] ${
        !isOpen ? 'w-[240px] md:w-[48px]' : ''
      }`}
    >
      <nav
        className={`absolute z-[12] left-0 top-0 bg-blue-200 border-r-4 border-indigo-700 h-full duration-300 ease-out ${
          isOpen ? 'w-[48px] md:w-[240px]' : 'w-[240px] md:w-[48px]'
        }`}
      >
        <div className='absolute'>
          <div className='cursor-pointer' onClick={() => toggleSidebar()}>
            閉じる
          </div>
          <div>
            <ul>
              <li>12/30</li>
              <li>12/29</li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
}
