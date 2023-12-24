import { useMemo, useState } from 'react';
import { PLAN } from '@/common/constants';
import Link from 'next/link';
import { LINK_PATH } from '@/common/constants/path';

/**
 * ユーザーのステータス情報を表示する
 * @param {ユーザー情報}
 * @returns
 */
export default function Plan({ userData }: { userData: any }) {
  const [planColor, setPlanColor] = useState<string>('');

  useMemo(() => {
    const { status } = userData;
    switch (status) {
      case 1:
        setPlanColor('bg-line');
        break;
      default:
        setPlanColor('bg-line');
        break;
    }
  }, []);

  return (
    <div className='pt-6 pb-2 flex justify-between items-center'>
      <h2
        className={`${planColor} text-white rounded-full py-2 px-4 font-semibold shadow-md`}
      >
        {PLAN[userData.status]}
      </h2>
      <button className='font-semibold text-blue-500'>
        <Link href={LINK_PATH.MEMBER}>プラン変更</Link>
      </button>
    </div>
  );
}
