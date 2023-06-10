import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Irukara</h1>
      <p>いるから</p>
      <Link href='/mypage/useriddesu'>マイページへ</Link>
    </div>
  );
}
