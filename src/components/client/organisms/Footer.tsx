'use client';

import { footerList } from '@/common/config/site.config';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-nav text-white p-4'>
      <p>{footerList.title}</p>
      <div className='flex'>
        {footerList.list.map((list) => (
          <ul key={list.title}>
            <Link href={list.href}>
              <li className=''>{list.title}</li>
            </Link>
          </ul>
        ))}
      </div>
    </footer>
  );
}
