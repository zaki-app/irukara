/* session情報 */
export interface SessionUserInfo {
  name: string;
  email?: string;
  image: string;
  id: string;
}

export interface SessionProps {
  user: SessionUserInfo;
}
