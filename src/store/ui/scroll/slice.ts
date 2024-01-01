import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ScrollType {
  isScroll: boolean;
}

/**
 * tab切り替え時、sidebarも切り替える
 */
const initialState: ScrollType = {
  isScroll: false,
};

const ScrollSlice = createSlice({
  name: 'tabs-key',
  initialState,
  reducers: {
    setScroll: (state: ScrollType, action: PayloadAction<ScrollType>) => ({
      ...state,
      isScroll: action.payload.isScroll,
    }),
    clearScroll: () => initialState,
  },
});

export const { setScroll, clearScroll } = ScrollSlice.actions;

export default ScrollSlice;
