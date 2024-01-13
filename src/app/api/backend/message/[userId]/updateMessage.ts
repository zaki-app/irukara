import { SELECT_MODE } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { putApi } from '@/common/libs/api/lambda/requestClient';

interface UpdateImageProps {
  messageId: string;
  createdAt: number;
  type: number;
  shareStatus: number;
  referenceType?: number;
}

export async function updateMessage({
  messageId,
  createdAt,
  type,
  shareStatus,
  referenceType,
}: UpdateImageProps) {
  let response;
  const params = { shareStatus, referenceType };

  try {
    if (type === SELECT_MODE.GPT3) {
      // chat3.5更新
      const path = IRUKARA_API.PUT_MSG.replace(
        '{messageId}',
        messageId,
      ).replace('{createdAt}', createdAt.toString());

      const res = await putApi(path, params);
      console.log('更新レスポンス', res);

      response = res;
    } else if (type === SELECT_MODE.GPT4) {
      // chat4更新
    }
  } catch (err) {
    console.error('updateImage function error...', err);
    response = false;
  }

  return response;
}
