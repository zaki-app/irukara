import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthUserProfileSlice from '@/store/auth/slice';

/* 各reducerを読み込む */
const rootReducers = combineReducers({
  authUserProfileSlice: AuthUserProfileSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export const store = configureStore({
  reducer: rootReducers,
  // Redux拡張機能が有効のステージ
  devTools: process.env.CURRENT_STAGE !== 'prd',
});
