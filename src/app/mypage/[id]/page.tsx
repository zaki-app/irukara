import Link from 'next/link';

interface Repository {
  id: number;
  name: string;
  full_name: string;
}

export default async function MyPage({ params }: { params: { id: string } }) {
  console.log('何が入ってる？', params);
  // data fetch
  const response = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store',
  });
  const data: Repository = await response.json();
  console.log('レスポンス', data);

  return (
    <div>
      <h1>マイページです</h1>
      <p>{params.id}</p>
      <p>Next.js {data.full_name}</p>
      <Link href='/'>トップへ戻る</Link>
    </div>
  );
}
