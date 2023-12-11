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
import { SessionUserInfo } from '@/types/auth';
import TopMyPage from '@/components/client/organisms/top/login/TopMyPage';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = (await getServerSession(options)) as SessionUserInfo;

  return (
    <>
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
        // <div className='h-screen bg-red-400'>
        <TopMyPage />
        // </div>
      )}
    </>
  );
}
