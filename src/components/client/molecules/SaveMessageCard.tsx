'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { irukaraLogo } from '@/common/config/site.config';
import { Suspense } from 'react';

interface SaveMessageProps {
  question: string;
  answer: string;
}

export default function SaveMessageCard({
  question,
  answer,
}: SaveMessageProps) {
  // ユーザーのLINE画像を取得
  const userProfile = useSelector(
    ({ authUserProfileSlice }) => authUserProfileSlice,
  );

  return (
    <Suspense fallback={<p>...loading</p>}>
      <div>
        <div>
          <Image
            src={userProfile.pictureUrl ?? ''}
            alt={`${userProfile.displayName}}さんのプロフィール画像`}
            width={30}
            height={30}
          />
        </div>
        <div>{question}</div>
      </div>
      <div>
        <div>
          <Image
            src={irukaraLogo.src}
            alt={irukaraLogo.alt}
            width={30}
            height={30}
          />
        </div>
        <div>{answer}</div>
      </div>
    </Suspense>
  );
}
