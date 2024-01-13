import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SpinnerType {
  isSpinner: boolean;
}

/**
 * spinner表示管理
 */
const initialState: SpinnerType = {
  isSpinner: false,
};

const SpinnerSlice = createSlice({
  name: 'spinner-slice',
  initialState,
  reducers: {
    setSpinner: (state: SpinnerType, action: PayloadAction<SpinnerType>) => ({
      ...state,
      isSpinner: action.payload.isSpinner,
    }),
    clearSpinner: () => initialState,
  },
});

export const { setSpinner, clearSpinner } = SpinnerSlice.actions;

export default SpinnerSlice;
