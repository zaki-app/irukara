'use client';

import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SetDynamicRoute() {
  const router = useRouter();
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  useEffect(() => {
    router.refresh();
    console.log('props矯正リフレッシュ');
  }, [router, selectedMenu]);

  return <></>;
}
