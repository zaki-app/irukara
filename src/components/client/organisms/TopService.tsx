'use client';

import Image from 'next/image';
import Link from 'next/link';
import { irukaraLogo } from '@/common/config/site.config';
import { useEffect, useState } from 'react';
import liff from '@line/liff';
import InButton from '../atoms/InButton';
import KanitFont from '../atoms/KanitFont';

export default function TopService({ isWeb }: { isWeb: string }) {
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    if (parseInt(isWeb, 10) === 0) {
      setButtonText('LINEでログイン');
    }
  }, []);

  function lineLogin() {
    liff.login();
  }

  return (
    <div className='flex flex-col py-12 bg-gradient-to-r from-sky-50 to-sky-100'>
      <div className='flex justify-center font-bold text-4xl py-4'>
        <KanitFont
          tag='h1'
          fontStyle='text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400'
          text='Welcome to Irukara!!'
        />
      </div>
      <div className='flex justify-center pt-4 pb-8'>
        <Image
          src={irukaraLogo.src}
          alt={irukaraLogo.alt}
          width={130}
          height={130}
        />
      </div>

      <div>
        {buttonText ? (
          <button onClick={lineLogin}>
            <InButton text={buttonText} />
          </button>
        ) : (
          <Link href='/mypage'>
            <InButton text='マイページへ' />
          </Link>
        )}
      </div>
    </div>
  );
}
