import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthUserProfileSlice from '@/store/auth/slice';
import AuthUserDataSlice from './auth/user/slice';

/* 各reducerを読み込む */
const rootReducers = combineReducers({
  authUserProfileSlice: AuthUserProfileSlice.reducer,
  authUserDataSlice: AuthUserDataSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export const store = configureStore({
  reducer: rootReducers,
  // Redux拡張機能が有効のステージ(local, devのみ)
  devTools:
    process.env.CURRENT_STAGE === 'dev' ||
    process.env.CURRENT_STAGE === 'local',
});
