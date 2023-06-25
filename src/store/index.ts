import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthUserProfileSlice from '@/store/line-profile/slice';

/* 各reducerを読み込む */
const rootReducers = combineReducers({
  authUserProfileSlice: AuthUserProfileSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export const store = configureStore({
  reducer: rootReducers,
  // 本番環境ではRedux拡張機能を無効にする
  devTools: process.env.NODE_ENV !== 'production',
});
