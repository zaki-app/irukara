/* MessageTableに関しての型定義 */

export interface MessageType {
  answer: string;
  createdAt: number;
  memberStatus: string;
  messageId: string;
  question: string;
}

export interface GetMessagesType {
  count: number;
  data: MessageType[];
}

// 履歴のメッセージレスポンスタイプ
export interface HistoryDataMessageRes {
  count: number;
  data: MessageType[];
}

export interface HistoryDataProps {
  data: {
    count: number;
    data: MessageType[] | ImageGenerateRes[];
  };
  type: number;
}
