'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/config/site.config';
import Image from 'next/image';
import { navbar } from '@/styles/common/styles';

function Header() {
  return (
    <header className={navbar.basic}>
      <div>
        <Link href={siteConfig.topHref}>
          <Image
            src={siteConfig.headerLogo}
            alt={siteConfig.logoAlt}
            width={70}
            height={70}
          />
          <h1 className=''>{siteConfig.siteTitle}</h1>
        </Link>
      </div>
      <div>
        {siteConfig.headerList.map((list) => (
          <ul key={list.title}>
            <Link href={list.href}>
              <li>{list.title}</li>
            </Link>
          </ul>
        ))}
      </div>
      {/* {children} */}
    </header>
  );
}

export default Header;
