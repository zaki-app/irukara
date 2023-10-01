'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';
import { allDeleteCookies } from '@/common/utils/authLINE/manageCookies';

import { useState } from 'react';
import { signOut, signIn } from 'next-auth/react';
import { KanitFont } from '../atoms';
import LoginModal from '../molecules/LoginModal';
import HamburgerMenu from '../molecules/HamburgerMenu';

export default function Header() {
  function clickSignOut() {
    signOut();
    allDeleteCookies();
    window.location.href = '/';
  }

  const [isModal, setModal] = useState(false);

  return (
    <header className='shadow-md w-full fixed top-0 left-0 h-[5rem] z-[10]'>
      <div className='bg-nav text-white p-4 flex items-center justify-between'>
        <nav>
          <a href={siteConfig.topHref} className='flex items-center'>
            <Image
              src={siteConfig.headerLogo}
              alt={siteConfig.logoAlt}
              width={50}
              height={50}
            />
            <KanitFont fontStyle='text-white text-3xl ml-4' text='Irukara' />
          </a>
        </nav>
        {/* ログインボタン モーダル */}
        <div className='flex items-center'>
          <button
            className='bg-line py-2 px-3 mr-4 rounded-lg font-bold shadow-lg hover:bg-green-600'
            type='button'
            onClick={() => setModal(true)}
          >
            ログイン
          </button>
          {isModal && <LoginModal isModal={isModal} closeModal={setModal} />}
          <HamburgerMenu />
        </div>
      </div>
      <button onClick={clickSignOut}>テストサインアウト</button>
    </header>
  );
}
