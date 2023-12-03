'use client';

import React, { useState } from 'react';

import { signOut, useSession } from 'next-auth/react';
import {
  irukamoBasic,
  irukamoBasicAlt,
  SITE_CONFIG,
  SITE_TITLE,
} from '@/common/config/site.config';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { allDeleteCookies } from '@/common/utils/manageCookies';
import { CALLBACK } from '@/common/constants/path';
import LoginButton from '../../atoms/LoginButton';

/**
 * ハンバーガーメニュー
 * @returns
 */
export default function HamburgerMenu() {
  const [isHamburger, setHamburger] = useState<boolean>(false);
  // ユーザーの状態を取得
  const { data } = useSession();

  function hamburgerToggle() {
    setTimeout(() => {
      setHamburger(!isHamburger);
    }, 0.3);
  }

  // サインアウト
  async function clickSignOut() {
    await signOut({ callbackUrl: CALLBACK.LOGOUT_URL });
    await allDeleteCookies();
  }

  return (
    <>
      {/* ボタン */}
      <button
        onClick={() => hamburgerToggle()}
        className='text-3xl right-8 top-6 cursor-pointer'
      >
        {isHamburger ? <FaTimes /> : <FaBarsStaggered />}
      </button>

      {/* ハンバーガーメニュー */}
      <>
        {isHamburger && <style>{'body {overflow: hidden}'}</style>}
        <nav
          draggable={false}
          className={`fixed inset-0 h-screen flex flex-col top-0
        w-full z-[12] text-base_font transition-all shadow
        ${
          isHamburger
            ? 'visible bg-black/10 backdrop-blur-sm duration-500 ease-in-out'
            : 'invisible'
        }`}
        >
          <div
            className={`absolute bg-gradient-to-t from-gray-100 to-blue-50 h-screen w-[80%] md:w-[40%] -right-full transition-all ${
              isHamburger
                ? 'right-0 duration-500 ease-in-out'
                : '-right-full duration-500 ease-linear'
            }`}
          >
            <div className='px-8 py-16'>
              {/* 共通で表示する項目 */}
              <div className='flex justify-center'>
                <Image
                  src={irukamoBasic}
                  alt={irukamoBasicAlt}
                  width={130}
                  height={130}
                />
              </div>
              <FaTimes
                className='absolute right-0 top-0 bg-blue-500 m-4 text-4xl text-white 
              rounded-full p-1 font-bold cursor-pointer hover:translate-y-1
              transition-all'
                onClick={() => hamburgerToggle()}
              />
              <ul className='flex flex-col gap-2 p-8 mt-6'>
                <li className='text-3xl font-bold mb-2 flex justify-center items-center'>
                  <Image
                    src={SITE_CONFIG.ICON}
                    width={30}
                    height={30}
                    alt={SITE_CONFIG.LOGO_ALT}
                  />
                  <div className='ml-3'>{SITE_TITLE}</div>
                </li>
                {SITE_CONFIG.HEADER_LIST.map((item) => (
                  <li
                    key={item.id}
                    className='hover:text-blue-400 text-lg my-2 hover:font-semibold cursor-pointer'
                  >
                    <Link href={item.href} onClick={() => hamburgerToggle()}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                {data ? (
                  <>
                    {/* ログインユーザーのみ */}
                    {SITE_CONFIG.LOGIN_USER.map((item) => (
                      <React.Fragment key={item.id}>
                        <li className='hover:text-blue-400 text-lg my-2 hover:font-semibold cursor-pointer'>
                          <Link href={item.href}>{item.title}</Link>
                        </li>
                        <li>
                          <button
                            className='hover:text-blue-400 text-lg my-2 hover:font-semibold cursor-pointer'
                            onClick={clickSignOut}
                          >
                            サインアウト
                          </button>
                        </li>
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {/* 未ログイン TODO クラスはまとめたい */}
                    <div className='w-full mx-auto scale-100 mt-4 mb-8 md:mb-6'>
                      <LoginButton
                        type='line'
                        className='py-2 w-full'
                        size={30}
                        textClass='ml-2 text-base font-bold'
                      />
                    </div>
                    <div className='w-full mx-auto scale-100'>
                      <LoginButton
                        type='google'
                        className='py-2'
                        size={20}
                        textClass='ml-2 text-base font-bold'
                      />
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    </>
  );
}
