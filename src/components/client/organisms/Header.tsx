'use client';

import { SITE_CONFIG } from '@/common/config/site.config';
import Image from 'next/image';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { KanitFont } from '../atoms';
import LoginModal from '../molecules/header/LoginModal';
import HamburgerMenu from '../molecules/header/HamburgerMenu';
import LoginUserCard from '../molecules/header/LoginUserCard';

export default function Header() {
  // modal
  const [isModal, setModal] = useState(false);
  const { isAuth } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  return (
    <header className='shadow-md w-full fixed top-0 left-0 h-[4rem] z-[10]'>
      <div className='w-full h-full bg-nav text-white p-4 flex items-center justify-between'>
        <nav>
          <a href={SITE_CONFIG.TOP_HREF} className='flex items-center'>
            <Image
              src={SITE_CONFIG.HEADER_LOGO}
              alt={SITE_CONFIG.LOGO_ALT}
              width={40}
              height={40}
            />
            <KanitFont fontStyle='text-white text-2xl ml-4' text='Irukara' />
          </a>
        </nav>
        <div className='flex items-center'>
          {/* ログインボタン モーダル */}
          {!isAuth ? (
            <button
              className='bg-line py-2 px-3 mr-4 rounded-lg font-bold shadow-lg hover:bg-green-600'
              type='button'
              onClick={() => setModal(true)}
            >
              ログイン
            </button>
          ) : (
            <LoginUserCard />
          )}
          {isModal && <LoginModal isModal={isModal} closeModal={setModal} />}
          {/* ハンバーガーメニュー */}
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
