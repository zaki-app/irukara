import { IMAGE_TYPE } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { putApi } from '@/common/libs/api/lambda/requestClient';

interface UpdateImageProps {
  imageId: string;
  createdAt: number;
  type: number;
  shareStatus: number;
  referenceType?: number;
}

export async function updateImage({
  imageId,
  createdAt,
  type,
  shareStatus,
  referenceType,
}: UpdateImageProps) {
  console.log(
    'updateImageが呼ばれる',
    imageId,
    createdAt,
    type,
    shareStatus,
    referenceType,
  );

  let response;
  const params = { shareStatus, referenceType };

  try {
    if (type === IMAGE_TYPE.ILLUST) {
      // イラスト更新
      const path = IRUKARA_API.PUT_ILLUST_IMAGE.replace(
        '{imageId}',
        imageId,
      ).replace('{createdAt}', createdAt.toString());

      const res = await putApi(path, params);
      console.log('更新レスポンス', res);

      response = res;
    } else if (type === IMAGE_TYPE.REAL) {
      // リアル更新
    }
  } catch (err) {
    console.error('updateImage function error...', err);
    response = false;
  }

  return response;
}
