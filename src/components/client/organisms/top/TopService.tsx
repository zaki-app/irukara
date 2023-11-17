'use client';

import Image from 'next/image';
import Link from 'next/link';
import { irukaraLogo } from '@/common/config/site.config';
import { useEffect, useState } from 'react';
import { getCookie } from '@/common/utils/authLINE/manageCookies';
import { InButton, KanitFont, LineButton } from '@/components/client/atoms';
import { useSession } from 'next-auth/react';
import LoginModal from '@/components/client/molecules/LoginModal';

export default function TopService() {
  const [isUserId, setIsUserId] = useState<boolean>(false);
  const [isModal, setModal] = useState<boolean>(false);

  const { data } = useSession();

  useEffect(() => {
    (async () => {
      const userId = await getCookie('irukaraId');
      if (userId) {
        setIsUserId(true);
      }
    })();
  }, [isUserId]);

  return (
    <div className='w-full flex flex-col py-14 bg-gradient-to-r from-sky-50 to-sky-100'>
      <div className='max-w-5xl m-auto'>
        <div className='flex justify-center font-bold text-4xl py-4 animate-up'>
          <KanitFont
            fontStyle='text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400'
            text='Welcome to Irukara!!'
          />
        </div>
        <div className='flex justify-center pt-4 pb-8 animate-up'>
          <Image
            src={irukaraLogo.src}
            alt={irukaraLogo.alt}
            width={160}
            height={160}
          />
        </div>

        <div className='flex justify-center w-[85%] md:w-[70%] m-auto gap-4 md:flex-row flex-col'>
          <div className='w-full mb-6 md:w-[50%]'>
            {data ? (
              <Link href='/mypage'>
                <InButton
                  buttonStyle='px-2 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-xl'
                  text='マイページへ'
                />
              </Link>
            ) : (
              <div onClick={() => setModal(true)}>
                <InButton
                  buttonStyle='px-2 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-xl'
                  text='ログイン'
                />
              </div>
            )}
            {isModal && <LoginModal isModal={isModal} closeModal={setModal} />}
          </div>
          <div className='w-full md:w-[50%]'>
            <LineButton
              type={0}
              className=''
              size={30}
              textClass='px-2 py-4 text-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
