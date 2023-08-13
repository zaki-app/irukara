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
  const irukaraId = (await getCookie('irukaraId')) as string;
  return (
    <div>
      {/* <CurrentUrl /> */}
      {/* <TopService isWeb={isOsWeb ?? ''} /> */}
      <TopService irukaraId={irukaraId} />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePaid />
      <TopLastMessage />
    </div>
  );
}
