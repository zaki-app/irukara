import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TabsKeyType {
  key: number;
}

/**
 * tab切り替え時、sidebarも切り替える
 */
const initialState: TabsKeyType = {
  key: 0,
};

const TabsKeySlice = createSlice({
  name: 'tabs-key',
  initialState,
  reducers: {
    setTabsKey: (state: TabsKeyType, action: PayloadAction<TabsKeyType>) => ({
      ...state,
      key: action.payload.key,
    }),
    clearTabskey: () => initialState,
  },
});

export const { setTabsKey, clearTabskey } = TabsKeySlice.actions;

export default TabsKeySlice;
