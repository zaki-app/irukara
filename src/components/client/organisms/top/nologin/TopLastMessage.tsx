'use client';

import { lastMessage } from '@/common/config/site.config';

export default function TopLastMessage() {
  return (
    <div>
      <h3>{lastMessage}</h3>
      {/* <LineButton type={1} /> */}
    </div>
  );
}
