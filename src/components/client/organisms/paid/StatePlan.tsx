'use client';

import { useSelector } from 'react-redux';
import type { UserProfileSelector, PlanText } from '@/common/types/LineTypes';
import { useEffect, useState } from 'react';

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
    <div>
      {isUser ? (
        <div>
          <h1>
            {userProfile.displayName}さんの{text}
          </h1>
          <p>現在のプラン: イルカモプラン</p>
          <p>プランを変更する</p>
        </div>
      ) : (
        <div>ユーザーローディング</div>
      )}
    </div>
  );
}
