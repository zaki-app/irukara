'use client';

import Image from 'next/image';
import { irukaraLogo } from '@/common/config/site.config';
import InButton from '../atoms/InButton';

export default function TopContents() {
  return (
    <div className='flex flex-col py-12'>
      <div className='flex justify-center font-bold text-3xl py-4'>
        <h1>Welcome to Irukara!</h1>
      </div>
      <div className='flex justify-center py-6'>
        <Image
          src={irukaraLogo.src}
          alt={irukaraLogo.alt}
          width={130}
          height={130}
        />
      </div>
      <InButton text='マイページへ' link='/mypage/fejaofja' />
    </div>
  );
}
