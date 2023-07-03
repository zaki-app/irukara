'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function CurrentUrl() {
  const [currentUrl, setCurrentUrl] = useState('');
  console.log('現在のURL', window.location.href);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  });

  return <div>現在のURL: {currentUrl}</div>;
}
