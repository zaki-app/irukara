'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div>
        <h1>Not Found</h1>
        <p>お探しのページは見つかりませんでした</p>
      </div>
      <div>
        <Link href='/'>トップページへ戻る</Link>
      </div>
    </div>
  );
}
