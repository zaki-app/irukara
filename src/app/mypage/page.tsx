import fetchMessage from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveMessageData } from '@/common/types/LineTypes';
import { Suspense } from 'react';
import { isCookie } from '@/common/utils/authLINE/manageCookies';

interface SaveMessageDataProps {
  data: SaveMessageData[];
}

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const { data }: SaveMessageDataProps = await fetchMessage();
  console.log('レスポンス', data);
  return (
    <div>
      <StatePlan text='マイページ' />
      <Suspense fallback={<div>ローディング中です</div>}>
        {data.map((item) => (
          <div key={item.messageId}>
            <SaveMessageCard
              question={item.question}
              answer={item.answer}
              createdAt={item.createdAt}
            />
          </div>
        ))}
      </Suspense>
    </div>
  );
}
