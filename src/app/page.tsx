import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';
import TopPlayGround from '@/components/client/organisms/top/TopPlayGround';

export default async function Home() {
  return (
    <div>
      <TopService />
      <TopPlayGround />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePaid />
      <TopLastMessage />
    </div>
  );
}
