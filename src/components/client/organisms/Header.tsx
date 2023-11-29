'use client';

import { SITE_CONFIG } from '@/common/config/site.config';
import Image from 'next/image';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaCaretDown } from 'react-icons/fa';
import { KanitFont } from '../atoms';
import LoginModal from '../molecules/LoginModal';
import HamburgerMenu from '../molecules/HamburgerMenu';

export default function Header() {
  // modal
  const [isModal, setModal] = useState(false);

  // user session
  const { data: session } = useSession();

  return (
    <header className='shadow-md w-full fixed top-0 left-0 h-[5rem] z-[10]'>
      <div className='bg-nav text-white p-4 flex items-center justify-between'>
        <nav>
          <a href={SITE_CONFIG.TOP_HREF} className='flex items-center'>
            <Image
              src={SITE_CONFIG.HEADER_LOGO}
              alt={SITE_CONFIG.LOGO_ALT}
              width={50}
              height={50}
            />
            <KanitFont fontStyle='text-white text-3xl ml-4' text='Irukara' />
          </a>
        </nav>
        <div className='flex items-center'>
          {/* ログインボタン モーダル */}
          {!session ? (
            <button
              className='bg-line py-2 px-3 mr-4 rounded-lg font-bold shadow-lg hover:bg-green-600'
              type='button'
              onClick={() => setModal(true)}
            >
              ログイン
            </button>
          ) : (
            <div className='mr-4 bg-gray-700 p-2 rounded-lg'>
              <div className='flex justify-center items-center'>
                <Image
                  src={session.user.image}
                  alt='ユーザー画像'
                  width={30}
                  height={30}
                  className='rounded-full mr-2 border-solid border-2'
                />
                <FaCaretDown
                  onClick={() => console.log('クリックされました')}
                />
                {/* <div className='ant-dropdown-trigger'>アントデザイン</div> */}
              </div>
            </div>
          )}
          {isModal && <LoginModal isModal={isModal} closeModal={setModal} />}
          {/* ハンバーガーメニュー */}
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
