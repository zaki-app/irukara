import React, { Suspense } from 'react';
import Link from 'next/link';
import Counter from '@/components/tests/ClientCounter';
import { getDatas } from '@/common/utils/tests/getData';
import TodoLists from '@/components/tests/TodoList';

// サーバー側
export const metadata = {
  title: 'テストページです',
};

// クライアント側
export default async function Page() {
  const todos = await getDatas();
  console.log('レスポンス', todos);

  return (
    <Suspense fallback='loading'>
      <h1>テストページ</h1>
      <Link href='/'>トップページへ</Link>
      <Counter />
      <TodoLists results={todos} />
    </Suspense>
  );
}
