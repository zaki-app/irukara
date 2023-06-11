'use client';

import Link from 'next/link';
import { siteConfig } from '@/common/meta/findMeta';

function Header() {
  return (
    <header>
      <Link href={siteConfig.topHref}>
        <h1>Irukaraヘッダー</h1>
      </Link>
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
