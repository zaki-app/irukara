import { fetchMessage } from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveMessageData } from '@/common/types/LineTypes';
import { Suspense } from 'react';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';

interface SaveMessageDataProps {
  data: SaveMessageData[] | boolean;
}

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const { data }: SaveMessageDataProps = await fetchMessage();
  console.log('レスポンス', data);
  return (
    <Suspense fallback={<div>MyPageのローディング中です</div>}>
      <ContentsWrapper>
        <div>
          <StatePlan text='マイページ' />
        </div>
        <div className='bg-pink'>
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
        </div>
      </ContentsWrapper>
    </Suspense>
  );
}
