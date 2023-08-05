import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';
import { getCookie } from '@/common/utils/authLINE/manageCookies';
import CurrentUrl from '@/components/client/atoms/CurrentUrl';

export default async function Home() {
  const isOsWeb = (await getCookie('os')) ? await getCookie('os') : 'false';
  console.log('osあるか？', isOsWeb);
  return (
    <div>
      {/* <CurrentUrl /> */}
      <TopService isWeb={isOsWeb ?? ''} />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePaid />
      <TopLastMessage />
    </div>
  );
}
