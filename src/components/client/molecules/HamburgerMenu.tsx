import React, { useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

/**
 * ハンバーガーメニュー
 * @returns
 */
export default function HamburgerMenu() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className='text-3xl right-8 top-6 cursor-pointer'
      >
        {isOpen ? <FaTimes /> : <FaBarsStaggered />}
      </button>
      {isOpen && (
        <nav>
          <div>ハンバーガー</div>
        </nav>
      )}
    </>
  );
}
