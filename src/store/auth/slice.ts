import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '@/types/LineTypes';
import { SessionUserInfo } from '@/types/auth';

/** ユーザープロフィールを保存 */
const initialState: SessionUserInfo = {
  name: '',
  email: '',
  image: '',
  id: '',
};

const AuthUserProfileSlice = createSlice({
  name: 'auth-user-profile',
  initialState,
  /* 情報をセットする */
  reducers: {
    setUserProfile: (
      state: SessionUserInfo,
      action: PayloadAction<SessionUserInfo>,
    ) => ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      image: action.payload.image,
    }),
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, clearUserProfile } =
  AuthUserProfileSlice.actions;

export default AuthUserProfileSlice;
