import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';
import TopPlayGround from '@/components/client/organisms/top/nologin/TopPlayGround';
import { getServerSession } from 'next-auth';
import { SessionProps } from '@/types/auth';
import TopMyPage from '@/components/client/organisms/top/login/TopMyPage';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = (await getServerSession(options)) as SessionProps;

  console.log('トップページ', session);

  return (
    <div>
      {!session ? (
        <>
          <TopService />
          <TopPlayGround />
          <TopServiceDescription />
          <TopUsedService />
          <TopServicePaid />
          <TopLastMessage />
        </>
      ) : (
        <TopMyPage />
      )}
    </div>
  );
}
