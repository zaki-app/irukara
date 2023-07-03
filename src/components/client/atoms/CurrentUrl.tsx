'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import liff from '@line/liff';

export default function CurrentUrl() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [userOs, setUserOs] = useState('');
  console.log('現在のURL', window.location.href);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setUserOs(liff.getOS() ?? '');
  });

  return (
    <Suspense fallback='現在のURL読み込み中'>
      <div>現在のURL: {currentUrl}</div>
      <div>{userOs}</div>
    </Suspense>
  );
}
