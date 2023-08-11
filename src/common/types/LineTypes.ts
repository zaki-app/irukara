/** LINEの型定義をまとめる */
export interface UserProfile {
  userId?: string | null;
  displayName: string | null;
  pictureUrl: string | null;
}

export interface UserProfileSelector {
  displayName?: string;
  pictureUrl: string;
}

export interface PlanText {
  text: string;
}

// 保存メッセージ
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

export interface SaveMessage {
  count: number;
  data: SaveMessageData;
}
