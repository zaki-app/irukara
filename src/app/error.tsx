'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function error({ reset }: ErrorProps) {
  useEffect(() => {
    console.log('エラーが発生しました', error);
  }, []);
  return (
    <div>
      <div>500エラーが発生しました</div>
      <button onClick={reset}>再実行する</button>
      <button>
        <Link href='/'>TOPへ戻る</Link>
      </button>
    </div>
  );
}
