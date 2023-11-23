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
