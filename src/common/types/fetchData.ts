/* データ関係の型定義 */

// MessagesTable
export interface SaveMessageData {
  messageId: string;
  answer: string;
  createdAt?: number;
  memberStatus: number;
  mode: number;
  question: string;
  referenceType: number;
  shareStatus: number;
  updatedAt?: number;
  userId: string;
}

// ImagesTable
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

// 保存メッセージ取得
export interface SaveMessageDataType {
  count: number;
  data: SaveMessageData[] | boolean;
}

// 保存画像データ取得
export interface SaveImageDataType {
  count: number;
  data: SaveImageData[] | boolean;
}

// メッセージ更新プロップス
export interface UpdateMessageData {
  messageId: string;
  memberStatus?: number;
  mode?: number;
  referenceType?: number;
  shareStatus?: number;
}
