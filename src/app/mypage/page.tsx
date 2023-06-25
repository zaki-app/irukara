import fetchMessage from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveMessageData } from '@/common/types/LineTypes';

interface SaveMessageDataProps {
  data: SaveMessageData[];
}

export default async function MyPage() {
  // ユーザーの保存メッセージを取得
  const { data }: SaveMessageDataProps = await fetchMessage();
  return (
    <div>
      <StatePlan text='マイページ' />
      {data.map((item) => (
        <div key={item.messageId}>
          <SaveMessageCard question={item.question} answer={item.answer} />
        </div>
      ))}
    </div>
  );
}
