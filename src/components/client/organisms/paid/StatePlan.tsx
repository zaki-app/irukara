'use client';

import { useSelector } from 'react-redux';
import type { UserProfileSelector, PlanText } from '@/types/LineTypes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TextTruncate from '@/common/libs/textTruncate';

export default function StatePlan({ text }: PlanText) {
  const userProfile: UserProfileSelector = useSelector(
    ({ authUserProfileSlice }) => authUserProfileSlice,
  );

  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile.displayName) {
      setIsUser(true);
    }
  }, [userProfile, isUser]);

  return (
    <div className='font-semibold'>
      {isUser ? (
        <div
          className='
            flex flex-col justify-center text-center bg-white border border-gray-200
            rounded-lg shadow mb-4 py-4'
        >
          <div className='mb-4 px-4'>
            <h1 className='text-xl border-b-2 border-blue-400'>
              {TextTruncate(userProfile.displayName ?? '', 20)}さんの{text}
            </h1>
          </div>
          <div>
            <p className='my-4'>
              現在のプラン: <span>イルカモプラン</span>
            </p>
            {text === 'マイページ' && (
              <div className='flex flex-col'>
                <Link
                  href='for-users/membership'
                  className='mb-2 text-blue-500 hover:opacity-80'
                >
                  プランを変更する
                </Link>
                <Link
                  href='user-info/profile'
                  className='text-blue-500 hover:opacity-80'
                >
                  ユーザー情報を編集する
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        // <Loading opacity={0.8} />
        <></>
      )}
    </div>
  );
}
