import React from 'react';
import Link from 'next/link';
import { fetchMessageDetail } from '@/common/libs/fetchMessage';
import type { SaveMessageData } from '@/common/types/LineTypes';

interface SearchParamsProps {
  searchParams: {
    messageId: string;
  };
}

export default async function MyPageDetail({
  searchParams,
}: SearchParamsProps) {
  const data: SaveMessageData | boolean = await fetchMessageDetail(
    searchParams.messageId,
  );
  console.log('クライアント詳細', data);

  return (
    <div>
      {data ? (
        <div>
          <h1>マイページです</h1>
          <p>
            Next.js
            {/* {data.full_name} */}
          </p>
          <div>
            {/* <p>{data.question}</p>
            <p>{data.answer}</p> */}
          </div>
          <Link href='/'>トップへ戻る</Link>
        </div>
      ) : (
        <div>データが見つかりません</div>
      )}
    </div>
  );
}
