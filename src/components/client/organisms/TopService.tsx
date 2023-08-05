'use client';

import Image from 'next/image';
import Link from 'next/link';
import { irukaraLogo } from '@/common/config/site.config';
import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { getCookie } from '@/common/utils/authLINE/manageCookies';
import InButton from '../atoms/InButton';
import KanitFont from '../atoms/KanitFont';

export default function TopService() {
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    // if (parseInt(isWeb, 10) === 0) {
    //   setButtonText('LINEでログイン');
    // }
    // if (getCookie("auth") === "true") {
    // }
  }, []);

  function lineLogin() {
    liff.login();
  }

  return (
    <div className='flex flex-col pt-14 pb-12 bg-gradient-to-r from-sky-50 to-sky-100'>
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
            <InButton
              buttonStyle='mx-8 mb-4 bg-gradient-to-r from-blue-700 to-sky-500 text-white py-4 text-center shadow-md rounded-lg text-xl font-bold'
              text='LINEログイン'
            />
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
