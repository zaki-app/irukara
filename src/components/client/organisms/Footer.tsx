'use client';

import {
  footerList,
  irukaraSmile,
  irukaraSmileAlt,
  siteTitle,
} from '@/common/config/site.config';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-nav text-white p-4'>
      <div className='flex flex-col gap-3 mb-4 py-4'>
        <div className='flex items-center md:justify-center py-4'>
          <Image
            src={irukaraSmile}
            alt={irukaraSmileAlt}
            width={30}
            height={30}
          />
          <h3 className='ml-4 font-bold text-xl'>{siteTitle}</h3>
        </div>
        <div className='flex flex-col md:flex-row md:justify-center md:items-center gap-3 text-semibold mb-4 '>
          {footerList.list.map((list) => (
            <ul key={list.title}>
              <Link href={list.href}>
                <li className=''>{list.title}</li>
              </Link>
            </ul>
          ))}
        </div>
        <p>{footerList.title}</p>
      </div>
    </footer>
  );
}
