import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthUserProfileType {
  isAuth: boolean;
  name: string;
  email?: string;
  image: string;
}

/** ユーザープロフィールを保存 */
const initialState: AuthUserProfileType = {
  isAuth: false,
  name: '',
  email: '',
  image: '',
};

const AuthUserProfileSlice = createSlice({
  name: 'auth-user-profile',
  initialState,
  /* 情報をセットする */
  reducers: {
    setUserProfile: (
      state: AuthUserProfileType,
      action: PayloadAction<AuthUserProfileType>,
    ) => ({
      ...state,
      isAuth: action.payload.isAuth,
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
