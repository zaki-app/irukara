import { API } from '@/common/constants/path';
import { ImageGenerateBody } from '@/types/image';
import { relayPostApi } from '../lambda/requestClient';

export async function imageGenerate({
  userId,
  prompt,
  memberStatus,
  type,
}: ImageGenerateBody) {
  console.log('props', userId, prompt, memberStatus, type);
  let response;

  try {
    // promptの半角・全角スペースをカンマ区切りに変換
    const newSeparator = prompt.replace(/[\s\uFEFF\xA0]+/g, ',');

    const illustRes = await relayPostApi(API.RELAY_POST_ILLUST, {
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
