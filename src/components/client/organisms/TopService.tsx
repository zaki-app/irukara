'use client';

import Image from 'next/image';
import Link from 'next/link';
import { irukaraLogo } from '@/common/config/site.config';
import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { getCookie } from '@/common/utils/authLINE/manageCookies';
import { InButton, KanitFont, LineButton } from '@/components/client/atoms';

export default function TopService() {
  const [isUserId, setIsUserId] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const userId = await getCookie('irukaraId');
      console.log('ユーザーID', userId);
      if (userId) {
        setIsUserId(true);
      }
    })();
  }, [isUserId]);

  function lineLogin() {
    liff.login();
  }

  return (
    <div className='flex flex-col pt-14 pb-12 bg-gradient-to-r from-sky-50 to-sky-100'>
      <div className='flex justify-center font-bold text-4xl py-4'>
        <KanitFont
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

      <div className='flex justify-center'>
        {liff.isLoggedIn() ? (
          <Link href='/mypage'>
            <InButton
              buttonStyle='bg-gradient-to-r from-blue-700 to-sky-500'
              text='マイページへ'
            />
          </Link>
        ) : (
          <div className='flex flex-col justify-center w-full mx-4 md:mx-36'>
            <button onClick={lineLogin}>
              <LineButton type={2} />
            </button>
            <p className='text-center py-4'>お友達登録がまだの方は</p>
            <LineButton type={1} />
          </div>
        )}
      </div>
    </div>
  );
}
