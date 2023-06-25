import React from 'react';
import Link from 'next/link';

interface Repository {
  id: number;
  name: string;
  full_name: string;
}

export default async function MyPageDetail({
  params,
}: {
  params: { id: string };
}) {
  // data fetch
  const response = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store',
  });
  const data: Repository = await response.json();

  return (
    <div>
      <h1>マイページです</h1>
      <p>{params.id}</p>
      <p>
        Next.js
        {data.full_name}
      </p>
      <Link href='/'>トップへ戻る</Link>
    </div>
  );
}
