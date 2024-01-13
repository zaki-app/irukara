import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AlertType {
  isAlert: boolean;
  message: string;
  numAlertType: number;
}

/**
 * alert表示管理
 */
const initialState: AlertType = {
  isAlert: false,
  message: '',
  numAlertType: 0,
};

const AlertSlice = createSlice({
  name: 'alert-slice',
  initialState,
  reducers: {
    setAlert: (state: AlertType, action: PayloadAction<AlertType>) => ({
      ...state,
      isAlert: action.payload.isAlert,
      message: action.payload.message,
      numAlertType: action.payload.numAlertType,
    }),
    clearAlert: () => initialState,
  },
});

export const { setAlert, clearAlert } = AlertSlice.actions;

export default AlertSlice;
