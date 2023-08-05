'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';
import type { Liff } from '@line/liff/exports';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/common/utils/authLINE/manageCookies';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { InButton, KanitFont } from '../atoms';

interface LiffProps {
  liff: Liff | null | undefined;
}

function Header({ liff }: LiffProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log('オープン状態', isOpen);

  function confirmSignOut() {
    liff?.logout();
    // ログアウト後は、ページをリフレッシュしてアクセストークンを削除
    router.refresh();
    deleteCookie();
  }

  return (
    <header className='shadow-md w-full fixed top-0 left-0'>
      <div className='bg-nav text-white p-4 md:flex items-center justify-between'>
        <nav>
          <Link href={siteConfig.topHref} className='flex items-center'>
            <Image
              src={siteConfig.headerLogo}
              alt={siteConfig.logoAlt}
              width={60}
              height={60}
            />
            <KanitFont
              tag='div'
              fontStyle='text-white text-3xl ml-4'
              text='Irukara'
            />
          </Link>
        </nav>
        {/* アイコン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'
        >
          {isOpen ? <FaTimes /> : <FaBarsStaggered />}
        </button>
        <nav>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 pl-9 md:pl-0 absolute md:static md:z-auto z-[-1] left-0 w-full transition-all bg-nav duration-500 ease-in ${
              isOpen ? 'top-20' : 'top-[-490px]'
            }`}
          >
            {siteConfig.headerList.map((list) => (
              <li
                key={list.title}
                className='font-semibold text-xl md:text-base my-8 md:my-0 md:ml-8'
              >
                <Link href={list.href}>{list.title}</Link>
              </li>
            ))}
            {liff?.isLoggedIn() ? (
              <button
                onClick={confirmSignOut}
                className='font-semibold my-2 md:my-0 md:ml-8'
              >
                サインアウト
              </button>
            ) : (
              <button
                onClick={() => liff?.login()}
                className='font-semibold my-2 md:my-0 md:ml-8'
              >
                <InButton
                  text='LINEログイン'
                  buttonStyle='py-2 px-4 bg-line rounded text-xl md:text-base'
                />
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
