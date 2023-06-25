import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';

export default function Home() {
  return (
    <div>
      <TopService />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePaid />
      <TopLastMessage />
    </div>
  );
}
