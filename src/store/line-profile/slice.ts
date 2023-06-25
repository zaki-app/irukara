import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '@/common/types/LineTypes';

/** ユーザープロフィールを保存 */
const initialState: UserProfile = {
  displayName: null,
  pictureUrl: null,
};

const AuthUserProfileSlice = createSlice({
  name: 'auth-user-profile',
  initialState,
  /* 情報をセットする */
  reducers: {
    setUserProfile: (
      state: UserProfile,
      action: PayloadAction<UserProfile>,
    ) => ({
      ...state,
      displayName: action.payload.displayName,
      pictureUrl: action.payload.pictureUrl,
    }),
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, clearUserProfile } =
  AuthUserProfileSlice.actions;

export default AuthUserProfileSlice;
