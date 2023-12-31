import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TextareaType {
  chatValue: string;
}

/**
 * tab切り替え時、sidebarも切り替える
 */
const initialState: TextareaType = {
  chatValue: '',
};

const ChatValueSlice = createSlice({
  name: 'chat-value',
  initialState,
  reducers: {
    setChatValue: (
      state: TextareaType,
      action: PayloadAction<TextareaType>,
    ) => ({
      ...state,
      chatValue: action.payload.chatValue,
    }),
    clearChatValue: () => initialState,
  },
});

export const { setChatValue, clearChatValue } = ChatValueSlice.actions;

export default ChatValueSlice;
