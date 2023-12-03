'use client';

import { RootState } from '@/store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function UserProfile() {
  // const { data: session, update } = useSession();
  const { name, image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  return (
    <div>
      <p>{name}さんがログインしています</p>
      {image && (
        <Image src={image} alt='ユーザーイメージ' width={50} height={50} />
      )}
    </div>
  );
}
