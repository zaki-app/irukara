import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SidebarType {
  isSidebar: boolean;
  isHeaderAction?: boolean;
}

/**
 * tab切り替え時、sidebarも切り替える
 */
const initialState: SidebarType = {
  isSidebar: false,
  isHeaderAction: false,
};

const SidebarSlice = createSlice({
  name: 'tabs-key',
  initialState,
  reducers: {
    setSidebar: (state: SidebarType, action: PayloadAction<SidebarType>) => ({
      ...state,
      isSidebar: action.payload.isSidebar,
      isHeaderAction: action.payload.isHeaderAction,
    }),
    clearSidebar: () => initialState,
  },
});

export const { setSidebar, clearSidebar } = SidebarSlice.actions;

export default SidebarSlice;
