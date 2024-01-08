// ImagesTableレスポンス
export interface ImageTableRes {
  imageId: string;
  userId: string;
  mode: number;
  prompt: string;
  outputUrl: string;
  referenceType: number;
  memberStatus: number;
  requestType: string;
  generation: number;
  createdAt: number;
}

export interface GetImageRes {
  count: number;
  data: ImageTableRes[];
}

// image生成に必要なbody
export interface ImageGenerateBody {
  userId: string;
  prompt: string;
  memberStatus: number;
  type: number; // 画像生成タイプ 2がイラスト、3がリアル
}

// image生成時のレスポンス
export interface ImageGenerateRes {
  imageId: string;
  userId: string;
  mode: number;
  shareStatus: number;
  prompt: string;
  outputUrl: string;
  referenceType: number;
  memberStatus: number;
  requestType: string;
  imageType: number;
  generation: number;
  createdAt: number;
}

// 履歴取得時のレスポンス
export interface ImageHistoryRes {
  count: number;
  data: ImageGenerateRes[];
}
