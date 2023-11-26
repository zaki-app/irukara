'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserProfile() {
  const { data } = useSession();
  console.log('セッション', data);

  return (
    <div>
      <p>{data?.user.name}さんがログインしています</p>
      {data?.user.image && (
        <Image
          src={data.user.image as string}
          alt='ユーザーイメージ'
          width={50}
          height={50}
        />
      )}
    </div>
  );
}
