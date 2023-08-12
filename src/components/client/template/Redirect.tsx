'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 強制的に指定のパスへリダイレクトする
 * @param path名 @string
 * @returns
 */
export default function Redirect({ path }: { path: string }) {
  console.log('パス', path);
  useEffect(() => {
    redirect(path);
  }, []);

  return null;
}
