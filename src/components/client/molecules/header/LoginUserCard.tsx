'use client';

import Image from 'next/image';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { CALLBACK } from '@/common/constants/path';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { allDeleteCookies } from '@/common/utils/cookie/manageCookies';

/**
 * ログインユーザーの画像ボックス、ドロップダウン
 * @returns
 */
export default function LoginUserCard() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { name, image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  const [isDropdown, setDropDown] = useState<boolean>(false);

  function toggleDropdown() {
    setDropDown(!isDropdown);
  }

  // dropdown以外の部分がクリックされた閉じる
  function clickOutSide(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropDown(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutSide);

    return () => {
      document.removeEventListener('click', clickOutSide);
    };
  }, []);

  return (
    <div className='bg-gray-700 p-2 rounded-lg relative' ref={dropdownRef}>
      <div
        className='flex justify-center items-center cursor-pointer'
        onClick={toggleDropdown}
      >
        <Image
          src={image}
          alt='ユーザー画像'
          width={30}
          height={30}
          className='rounded-full mr-2 border-solid border-2'
        />
        <FaCaretDown />
      </div>
      {/* dropdown */}
      {isDropdown && (
        <div className='absolute right-0 mt-[0.5rem] w-[12rem] z-[15] bg-white text-basic rounded-lg shadow-lg py-2 pl-3 pr-1 text-sm'>
          <div className='w-full p-2 font-semibold border-b-2 border-gray-100 mb-2'>
            {name}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='hover:bg-neutral-100 p-2 rounded-md cursor-pointer'>
              <Link href='/'>プロフィール</Link>
            </div>
            <div className='hover:bg-neutral-100 p-2 rounded-md cursor-pointer'>
              <Link href='/'>プラン変更</Link>
            </div>
            <div className='hover:bg-neutral-100 p-2 rounded-md'>
              <div
                className='cursor-pointer'
                onClick={async () => {
                  await signOut({ callbackUrl: CALLBACK.LOGOUT_URL });
                  await allDeleteCookies();
                }}
              >
                サインアウト
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
