import React, { Suspense } from 'react';
import Link from 'next/link';
import { fetchMessageDetail } from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageDetailCard from '@/components/client/molecules/SaveMessageDetailCard';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';

import type { SaveMessageData } from '@/common/types/fetchData';

interface SearchParamsProps {
  searchParams: {
    messageId: string;
  };
}

export default async function MyPageDetail({
  searchParams,
}: SearchParamsProps) {
  const data: SaveMessageData = await fetchMessageDetail(
    searchParams.messageId,
  );
  console.log('クライアント詳細', data);

  return (
    <Suspense fallback={<div>ローディング中です</div>}>
      <ContentsWrapper>
        <StatePlan text='マイページ' />
        <div>
          <div>
            <SaveMessageDetailCard
              question={data.question}
              answer={data.answer}
              createdAt={data.createdAt}
              updatedAt={data.updatedAt ? data.updatedAt : null}
            />
          </div>
          <Link href='/'>トップへ戻る</Link>
        </div>
      </ContentsWrapper>
    </Suspense>
  );
}
