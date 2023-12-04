'use client';

import { RootState } from '@/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function UserProfile() {
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
