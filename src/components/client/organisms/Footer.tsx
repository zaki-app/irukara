'use client';

import {
  FOOTER_LIST,
  irukaraSmile,
  irukaraSmileAlt,
  SITE_TITLE,
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
          <h3 className='ml-4 font-bold text-xl'>{SITE_TITLE}</h3>
        </div>
        <div className='flex flex-col md:flex-row md:justify-center md:items-center gap-3 text-semibold mb-4 '>
          {FOOTER_LIST.LIST.map((list) => (
            <ul key={list.title}>
              <Link href={list.href}>
                <li className=''>{list.title}</li>
              </Link>
            </ul>
          ))}
        </div>
        <p>{FOOTER_LIST.TITLE}</p>
      </div>
    </footer>
  );
}
