import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AlertType {
  isAlert: boolean;
  numType: number; // 1...1行、 2...説明付き
  message: string;
  description?: string;
  alertType: 'success' | 'info' | 'warning' | 'error' | undefined;
}

/**
 * alert表示管理
 */
const initialState: AlertType = {
  isAlert: false,
  numType: 0,
  message: '',
  description: '',
  alertType: undefined,
};

const AlertSlice = createSlice({
  name: 'alert-slice',
  initialState,
  reducers: {
    setAlert: (state: AlertType, action: PayloadAction<AlertType>) => ({
      ...state,
      isAlert: action.payload.isAlert,
      numType: action.payload.numType,
      message: action.payload.message,
      alertType: action.payload.alertType,
      description: action.payload.description,
    }),
    clearAlert: () => initialState,
  },
});

export const { setAlert, clearAlert } = AlertSlice.actions;

export default AlertSlice;
