'use client';

import React, { useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { siteConfig } from '@/common/config/site.config';

/**
 * ハンバーガーメニュー
 * @returns
 */
export default function HamburgerMenu() {
  const [isOpen, setOpen] = useState<boolean>(false);
  // ユーザーの状態を取得
  const { data } = useSession();

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className='text-3xl right-8 top-6 cursor-pointer'
      >
        {isOpen ? <FaTimes /> : <FaBarsStaggered />}
      </button>
      {isOpen && (
        <nav
          className={`absolute inset-0 h-screen bg-slate-50 flex flex-col top-[5.1rem] 
          right-0 w-full md:w-[40%] 
          text-base_font overflow-hidden origin-right duration-500
          ${isOpen ? 'translate-x-1' : 'opacity-0'}}`}
        >
          {/* 共通で表示する項目 */}
          <ul>
            {siteConfig.headerList.map((item) => (
              <li
                key={item.title}
                className='hover:translate-y-[-5px] cursor-pointer'
              >
                {item.title}
              </li>
            ))}
          </ul>
          {data ? (
            <>
              {/* ログインユーザーのみ */}
              <div>ログイン済み</div>
            </>
          ) : (
            <>
              {/* 未ログイン */}
              <div>ログインしてない</div>
            </>
          )}
        </nav>
      )}
    </>
  );
}
