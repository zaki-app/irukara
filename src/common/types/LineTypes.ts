/** LINEの型定義をまとめる */
export interface UserProfile {
  userId?: string | null;
  displayName: string | null;
  pictureUrl: string | null;
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
export interface SaveMessage {
  count: number;
  data: SaveMessageData;
}
