import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedMenuType {
  selectedMenu: number;
}

/**
 * 生成メニュー切り替え
 */
const initialState: SelectedMenuType = {
  selectedMenu: 0,
};

const SelectedMenuSlice = createSlice({
  name: 'selected-menu',
  initialState,
  reducers: {
    setSelectedMenuKey: (
      state: SelectedMenuType,
      action: PayloadAction<SelectedMenuType>,
    ) => ({
      ...state,
      selectedMenu: action.payload.selectedMenu,
    }),
    clearSelectedMenuKey: () => initialState,
  },
});

export const { setSelectedMenuKey, clearSelectedMenuKey } =
  SelectedMenuSlice.actions;

export default SelectedMenuSlice;
