import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// TODO messageとimageでそれぞれ分けてredux管理
interface AuthUserDataType {
  userId: string;
  status: number;
  // gpt3.5
  // weekMsg: number;
  // totalMsg: number;
  // weekMsgSave: number;
  // totalMsgSave: number;
  // // gpt4
  // weekMsg4: number;
  // totalMsg4: number;
  // weekMsgSave4: number;
  // totalMsgSave4: number;
  // // image
  // weekImg: number;
  // totalImg: number;
  // weekImgSave: number;
  // totalImgSave: number;
}

const initialState: AuthUserDataType = {
  userId: '',
  status: 0,
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
    }),
    clearAuthUserData: () => initialState,
  },
});

export const { setAuthUserData, clearAuthUserData } = AuthUserDataSlice.actions;

export default AuthUserDataSlice;
