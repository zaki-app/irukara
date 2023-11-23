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

// 6f66722ec12141b49fb0135468bf1fb53c6888f79c37484c11fb015231d1ecc1
