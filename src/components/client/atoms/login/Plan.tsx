import { useMemo, useState } from 'react';
import { PLAN } from '@/common/constants';
import Link from 'next/link';
import { LINK_PATH } from '@/common/constants/path';
import { IoMdCloseCircle } from 'react-icons/io';

/**
 * ユーザーのステータス情報を表示する
 * @param {ユーザー情報}
 * @returns
 */
export default function Plan({ userData }: { userData: any }) {
  const [planColor, setPlanColor] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(true);

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

  function closeElement() {
    setShow(false);
  }

  return (
    <>
      {isShow && (
        <div className='flex justify-between items-center py-2 px-4 text-sm bg-neutral-100'>
          <h2
            className={`${planColor} text-white rounded-full py-2 px-4 font-semibold shadow-md`}
          >
            {PLAN[userData.status]}
          </h2>
          <div className='flex items-center gap-2'>
            <button className='font-semibold text-blue-500'>
              <Link href={LINK_PATH.MEMBER}>プラン変更</Link>
            </button>
            <div className='text-lg text-blue-500 text-bold cursor-pointer'>
              <IoMdCloseCircle onClick={() => closeElement()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
