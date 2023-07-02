import { fetchMessage } from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveMessageData } from '@/common/types/LineTypes';
import { Suspense } from 'react';

interface SaveMessageDataProps {
  data: SaveMessageData[] | boolean;
}

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const { data }: SaveMessageDataProps = await fetchMessage();
  console.log('レスポンス', data);
  return (
    <div>
      <Suspense fallback={<div>ローディング中です</div>}>
        <StatePlan text='マイページ' />å
        {data && Array.isArray(data) ? (
          data.map((item) => (
            <div key={item.messageId}>
              <SaveMessageCard
                messageId={item.messageId}
                question={item.question}
                answer={item.answer}
                createdAt={item.createdAt}
              />
            </div>
          ))
        ) : (
          // TODO データが見つからなかった時とエラーになった時で描画するコンポーネントを分けたい
          <div>データが見つかりません</div>
        )}
      </Suspense>
    </div>
  );
}
