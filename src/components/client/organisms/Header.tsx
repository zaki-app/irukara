'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';
import type { Liff } from '@line/liff/exports';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/common/utils/authLINE/manageCookies';

interface LiffProps {
  liff: Liff | null | undefined;
}

function Header({ liff }: LiffProps) {
  const router = useRouter();

  function confirmSignOut() {
    liff?.logout();
    // ログアウト後は、ページをリフレッシュしてアクセストークンを削除
    router.refresh();
    deleteCookie();
  }

  return (
    <header className='bg-nav text-white p-4 flex justify-between'>
      <div className='flex items-center'>
        <Link href={siteConfig.topHref}>
          <Image
            src={siteConfig.headerLogo}
            alt={siteConfig.logoAlt}
            width={60}
            height={60}
          />
        </Link>
      </div>
      <div className='flex items-center'>
        {siteConfig.headerList.map((list) => (
          <ul key={list.title}>
            <Link href={list.href}>
              <li className='ml-2'>{list.title}</li>
            </Link>
          </ul>
        ))}
      </div>
      {liff?.isLoggedIn() ? (
        <button onClick={confirmSignOut}>サインアウト</button>
      ) : (
        <button onClick={() => liff?.login()}>ログイン</button>
      )}
    </header>
  );
}

export default Header;
