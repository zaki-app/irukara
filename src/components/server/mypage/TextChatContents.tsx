import { fetchMessage } from '@/common/libs/fetchMessage';
import type { SaveMessageData } from '@/common/types/LineTypes';

interface SaveMessageDataType {
  data: SaveMessageData[] | boolean;
}

export default async function TextChatContents(): Promise<JSX.Element> {
  const textChat: SaveMessageDataType = await fetchMessage();
  console.log('チャットデータコンポーネント', textChat);

  return (
    <>
      <div>テキストチャットコンポーネント</div>
    </>
  );
}
