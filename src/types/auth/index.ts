/* session情報 */
export interface SessionUserInfo {
  name: string;
  email?: string;
  image: string;
  isAuth: boolean;
}

/* UsersTable */
export interface AuthUserDataType {
  userId: string;
  status: number;
  name?: string;
  email?: string;
  pictureUrl?: string;
  // gpt3.5
  weekMsg: number;
  totalMsg: number;
  weekMsgSave: number;
  totalMsgSave: number;
  // gpt4
  weekMsg4: number;
  totalMsg4: number;
  weekMsgSave4: number;
  totalMsgSave4: number;
  // image
  weekImg: number;
  totalImg: number;
  weekImgSave: number;
  totalImgSave: number;
  createdAt?: number;
}
