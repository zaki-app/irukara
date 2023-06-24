import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePrice,
  TopLastMessage,
} from '@/components/client/organisms';

export default function Home() {
  return (
    <div>
      <TopService />
      <TopServiceDescription />
      <TopUsedService />
      <TopServicePrice />
      <TopLastMessage />
    </div>
  );
}
