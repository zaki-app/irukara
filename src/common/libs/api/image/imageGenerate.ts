import { API } from '@/common/constants/path';
import { ImageGenerateBody, ImageGenerateRes } from '@/types/image';
import { postApi } from '../lambda/requestClient';

export async function imageGenerate({
  userId,
  prompt,
  memberStatus,
  type,
}: ImageGenerateBody) {
  console.log('props', userId, prompt, memberStatus);
  let response;

  try {
    // promptの半角・全角スペースをカンマ区切りに変換
    const newSeparator = prompt.replace(/[\s\uFEFF\xA0]+/g, ',');
    console.log('変換できてるか？', newSeparator);

    const illustRes = await postApi(API.RELAY_POST_ILLUST, {
      userId,
      prompt: newSeparator,
      memberStatus,
      type,
    });
    console.log('image res...', illustRes);

    if (!illustRes) {
      throw new Error('image res false...');
    } else {
      response = illustRes;
    }
  } catch (err) {
    console.error('imageGeneration error...', err);
    response = false;
  }

  return response;
}
