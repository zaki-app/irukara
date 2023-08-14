/* データ関係の型定義 */
export interface SaveMessageData {
  createdAt?: number;
  answer: string;
  question: string;
  memberStatus: number;
  messageId: string;
  referenceType: number;
  userId: string;
  lineUserId: string;
  updatedAt?: number;
}

export interface SaveImageData {
  createdAt: number;
  good: number;
  shareStatus: number;
  imageUrl: string;
  imageId: string;
  memberStatus: number;
  mode: number;
  userId: string;
  prompt: string;
  referenceType: number;
  updatedAt?: number;
}

export interface SaveMessageDataType {
  count: number;
  data: SaveMessageData[] | boolean;
}

export interface SaveImageDataType {
  count: number;
  data: SaveImageData[] | boolean;
}

// 保存メッセージ
export interface SaveMessage {
  count: number;
  data: SaveMessageData;
}
