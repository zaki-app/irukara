'use client';

import { useSelector } from 'react-redux';
import { UserProfile } from '@/common/types/LineTypes';

interface ProfileState {
  authUserProfileSlice: UserProfile;
}

export default function StatePlan() {
  const profile = useSelector(
    (state: ProfileState) => state.authUserProfileSlice,
  );

  return (
    <div>
      <div>
        <h1>{profile.displayName}さんの現在のプラン</h1>
        <p>現在のプラン: イルカモプラン</p>
        <p>プランを変更する</p>
      </div>
    </div>
  );
}
