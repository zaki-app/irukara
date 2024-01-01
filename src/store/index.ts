import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthUserProfileSlice from '@/store/auth/slice';
import AuthUserDataSlice from '@/store/auth/user/slice';
import TabsKeySlice from '@/store/ui/tab/slice';
import SidebarSlice from '@/store/ui/sidebar/slice';
import MenuSlice from '@/store/ui/menu/slice';
import ScrollSlice from './ui/scroll/slice';

/* 各reducerを読み込む */
const rootReducers = combineReducers({
  authUserProfileSlice: AuthUserProfileSlice.reducer,
  authUserDataSlice: AuthUserDataSlice.reducer,
  tabsKeySlice: TabsKeySlice.reducer,
  sidebarSlice: SidebarSlice.reducer,
  menuSlice: MenuSlice.reducer,
  scrollSlice: ScrollSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export const store = configureStore({
  reducer: rootReducers,
  // Redux拡張機能が有効のステージ(local, devのみ)
  devTools:
    process.env.CURRENT_STAGE === 'dev' ||
    process.env.CURRENT_STAGE === 'local',
});
