'use client';

import { currentTime } from '@/common/libs/dateFormat';
import { RootState } from '@/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

interface UserCardProps {
  question: string;
  createdAt: number;
}

/**
 * ユーザーの質問とイメージカード
 * @param 質問、作成日
 */
export default function UserCard({ question, createdAt }: UserCardProps) {
  const { image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  return (
    <div className='flex justify-start items-center border-2 rounded-lg bg-neutral-50 p-4 mb-2'>
      <Image
        src={image}
        alt='ユーザーロゴ'
        width={30}
        height={30}
        className='rounded-full border border-gray-300'
      />
      <div className='flex flex-col ml-4 w-full'>
        <p>{question}</p>
        <p className='flex justify-end'>{currentTime(createdAt)}</p>
      </div>
    </div>
  );
}
