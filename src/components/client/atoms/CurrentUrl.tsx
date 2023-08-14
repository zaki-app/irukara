'use client';

import { useEffect, useState, Suspense } from 'react';
import liff from '@line/liff';

export default function CurrentUrl() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [userOs, setUserOs] = useState('');
  const [userAgent, setUserAgent] = useState('');
  console.log('現在のURL', window.location.href);
  console.log(
    'userAgent これにLIFFだと最後にLIFFが入る',
    window.navigator.userAgent,
  );

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setUserOs(liff.getOS() ?? '');
    setUserAgent(window.navigator.userAgent);
  });

  return (
    <Suspense fallback='現在のURL読み込み中'>
      <div>現在のURL: {currentUrl}</div>
      <div>{userOs}</div>
      <div>{userAgent}</div>
    </Suspense>
  );
}
