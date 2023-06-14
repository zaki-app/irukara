'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';

function Header() {
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
          <h1 className=''>{siteConfig.siteTitle}</h1>
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
      {/* {children} */}
    </header>
  );
}

export default Header;
