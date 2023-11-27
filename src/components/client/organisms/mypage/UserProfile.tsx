'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserProfile() {
  const { data: session, update } = useSession();
  console.log('セッション', session);

  async function updateSession() {
    // if (session) session.user.accessToken = 'dddd';

    await update({
      ...session,
      user: {
        ...session?.user,
        accessToken: 'newsession',
      },
    });
  }

  return (
    <div>
      <p>{session?.user.name}さんがログインしています</p>
      {session?.user.image && (
        <Image
          src={session.user.image as string}
          alt='ユーザーイメージ'
          width={50}
          height={50}
        />
      )}
      <button className='bg-red-300' onClick={updateSession}>
        update
      </button>
    </div>
  );
}
