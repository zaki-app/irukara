import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';
// import { useSession } from 'next-auth/react';
// import CurrentUrl from '@/components/client/atoms/CurrentUrl';

export default async function Home() {
  return (
    <div>
      {/* <CurrentUrl /> */}
      {/* <TopService isWeb={isOsWeb ?? ''} /> */}
      <TopService />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePaid />
      <TopLastMessage />
    </div>
  );
}
