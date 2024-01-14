'use client';

import { RootState } from '@/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

export default function UserProfileCard() {
  const { name, image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );
  const [isLoad, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <div className='flex flex-col items-center gap-4'>
      {isLoad ? (
        // <div className='flex flex-col items-center gap-4'>
        <div>
          <Image
            src={image}
            alt='ユーザーアイコン'
            width={100}
            height={100}
            className='rounded-full border-2 shadow-sm'
          />
          <p className='text-base font-semibold'>{name}</p>
        </div>
      ) : (
        // </div>
        <Spin />
      )}
    </div>
  );
}
