'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';
import type { Liff } from '@line/liff/exports';
import { redirect, useRouter } from 'next/navigation';
import { deleteCookie } from '@/common/utils/authLINE/manageCookies';
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { InButton, KanitFont, LineButton } from '../atoms';

interface HeaderProps {
  liff: Liff | null | undefined;
}

function Header({ liff }: HeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log('リフです', liff);

  function confirmSignOut() {
    liff?.logout();
    console.log('サインアウト後', liff?.isLoggedIn());
    // ログアウト後は、ページをリフレッシュしてアクセストークンを削除
    setIsOpen(false);
    router.refresh();
    deleteCookie();
    console.log('サインアウト');
  }

  return (
    <header className='shadow-md w-full fixed top-0 left-0'>
      <div className='bg-nav text-white p-4 md:flex items-center justify-between'>
        <nav>
          <a href={siteConfig.topHref} className='flex items-center'>
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
          </a>
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
            className={`md:flex md:items-center pr-8 md:pr-0 md:pb-0 pb-12 pl-9 md:pl-0 absolute md:static md:z-auto z-[-1] left-0 w-full transition-all bg-nav duration-500 ease-in ${
              isOpen ? 'top-20' : 'top-[-490px]'
            }`}
          >
            {siteConfig.headerList.map((list) => (
              <li
                key={list.title}
                className='font-semibold text-xl md:text-base my-8 md:my-0 md:ml-8'
              >
                <Link href={list.href} onClick={() => setIsOpen(!isOpen)}>
                  {list.title}
                </Link>
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
              <div className='mt-6 md:mt-0'>
                {isOpen && (
                  <button
                    onClick={() => liff?.login()}
                    className='font-semibold md:ml-8 w-full md:w-auto mt-6 md:mt-0 mb-6 md:mb-0'
                  >
                    <LineButton type={3} />
                  </button>
                )}
                <LineButton type={0} />
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
