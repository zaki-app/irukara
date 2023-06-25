'use client';

import { useSelector } from 'react-redux';
import type { UserProfile, PlanText } from '@/common/types/LineTypes';

interface ProfileState {
  authUserProfileSlice: UserProfile;
}

export default function StatePlan({ text }: PlanText) {
  const profile = useSelector(
    (state: ProfileState) => state.authUserProfileSlice,
  );

  // console.log('プロフィール', profile);

  return (
    <div>
      <div>
        <h1>
          {profile.displayName}さんの{text}
        </h1>
        <p>現在のプラン: イルカモプラン</p>
        <p>プランを変更する</p>
      </div>
    </div>
  );
}
