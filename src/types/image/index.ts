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
