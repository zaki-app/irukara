'use client';

/* ユーザーのLINEアイコンを表示するコンポーネント */
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { userIcon } from '@/common/config/site.config';

interface UserProfile {
  displayName?: string;
  pictureUrl: string;
}

export default function ProfileImage() {
  const userProfile: UserProfile = useSelector(
    ({ authUserProfileSlice }) => authUserProfileSlice,
  );

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (userProfile.displayName) {
      setIsUser(true);
    }
  }, [userProfile, isUser]);

  return (
    <Suspense fallback={<div>ローディング</div>}>
      {isUser ? (
        <Image
          src={userProfile.pictureUrl}
          alt={userIcon}
          width={30}
          height={30}
        />
      ) : (
        <div>ローディング中</div>
      )}
    </Suspense>
  );
}
