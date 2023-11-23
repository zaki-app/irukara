// 'use client';

import { fetchMessage } from '@/common/libs/fetchMessage';
import type { SaveMessageData } from '@/types/fetchData';

interface SaveMessageDataType {
  data: SaveMessageData[] | boolean;
}

export default async function TextChatContents() {
  const textChat: SaveMessageDataType = await fetchMessage();
  console.log('チャットデータコンポーネント', textChat);

  return (
    <>
      <div>テキストチャットコンポーネント</div>
    </>
  );
}
