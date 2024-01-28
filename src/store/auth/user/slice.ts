import { AuthUserDataType } from '@/types/auth';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// TODO messageとimageでそれぞれ分けてredux管理

const initialState: AuthUserDataType = {
  userId: '',
  status: 0,
  name: '',
  email: '',
  pictureUrl: '',
  // gpt3.5
  weekMsg: 0,
  totalMsg: 0,
  weekMsgSave: 0,
  totalMsgSave: 0,
  // gpt4
  weekMsg4: 0,
  totalMsg4: 0,
  weekMsgSave4: 0,
  totalMsgSave4: 0,
  // image
  weekImg: 0,
  totalImg: 0,
  weekImgSave: 0,
  totalImgSave: 0,
};

const AuthUserDataSlice = createSlice({
  name: 'auth-user-data',
  initialState,
  reducers: {
    setAuthUserData: (
      state: AuthUserDataType,
      action: PayloadAction<AuthUserDataType>,
    ) => ({
      ...state,
      userId: action.payload.userId,
      status: action.payload.status,
      name: action.payload.name,
      email: action.payload.email,
      pictureUrl: action.payload.pictureUrl,
      // gpt3.5
      weekMsg: action.payload.weekMsg,
      totalMsg: action.payload.totalMsg,
      weekMsgSave: action.payload.weekMsgSave,
      totalMsgSave: action.payload.totalMsgSave,
      // gpt4
      weekMsg4: action.payload.weekMsg4,
      totalMsg4: action.payload.totalMsg4,
      weekMsgSave4: action.payload.weekMsgSave4,
      totalMsgSave4: action.payload.totalMsgSave4,
      // image
      weekImg: action.payload.weekImg,
      totalImg: action.payload.totalImg,
      weekImgSave: action.payload.weekImgSave,
      totalImgSave: action.payload.totalImgSave,
    }),
    clearAuthUserData: () => initialState,
  },
});

export const { setAuthUserData, clearAuthUserData } = AuthUserDataSlice.actions;

export default AuthUserDataSlice;
