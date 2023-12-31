'use client';

import { SITE_CONFIG } from '@/common/config/site.config';
import Image from 'next/image';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { setSidebar } from '@/store/ui/sidebar/slice';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
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
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <header className='shadow-md w-full fixed top-0 left-0 h-[4rem] z-[10]'>
      <nav className='w-full h-full bg-nav text-white p-4 flex items-center justify-center'>
        <div className='block md:hidden text-2xl mr-4 cursor-pointer'>
          {isAuth && isSidebar ? (
            <FaBarsStaggered
              onClick={() => {
                store.dispatch(
                  setSidebar({ isSidebar: !isSidebar, isHeaderAction: true }),
                );
              }}
            />
          ) : (
            <FaTimes
              onClick={() => {
                store.dispatch(
                  setSidebar({ isSidebar: !isSidebar, isHeaderAction: false }),
                );
              }}
            />
          )}
        </div>
        <div>
          <a href={SITE_CONFIG.TOP_HREF} className='flex items-center'>
            <Image
              src={SITE_CONFIG.HEADER_LOGO}
              alt={SITE_CONFIG.LOGO_ALT}
              width={40}
              height={40}
            />
            <KanitFont fontStyle='text-white text-2xl ml-4' text='Irukara' />
          </a>
        </div>
        {!isAuth ? (
          <div className='flex items-center'>
            {/* ログインボタン モーダル */}
            <button
              className='bg-line py-2 px-3 mr-4 rounded-lg font-bold shadow-lg hover:bg-green-600'
              type='button'
              onClick={() => setModal(true)}
            >
              ログイン
            </button>
            {isModal && <LoginModal isModal={isModal} closeModal={setModal} />}
            {/* ハンバーガーメニュー */}
            <HamburgerMenu />
          </div>
        ) : (
          <div className='ml-auto'>
            <LoginUserCard />
          </div>
        )}
      </nav>
    </header>
  );
}
