/* MessageTableに関しての型定義 */

export interface MessageType {
  shareStatus: number;
  question: string;
  messageId: string;
  mode?: number;
  memberStatus: string;
  requestType?: string;
  createdAt: number;
  referenceType: number;
  answer: string;
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
