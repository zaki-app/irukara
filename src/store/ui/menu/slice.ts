import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MenuType {
  isMenu: boolean;
}

/**
 * 生成メニュー切り替え
 */
const initialState: MenuType = {
  isMenu: true,
};

const MenuSlice = createSlice({
  name: 'tabs-key',
  initialState,
  reducers: {
    setMenuArea: (state: MenuType, action: PayloadAction<MenuType>) => ({
      ...state,
      isMenu: action.payload.isMenu,
    }),
    clearMenuArea: () => initialState,
  },
});

export const { setMenuArea, clearMenuArea } = MenuSlice.actions;

export default MenuSlice;
