'use client';

import { DATA } from '@/common/constants';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import ImageOutput from '@/components/client/atoms/login/chat/ImageOutput';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState } from '@/store';
import {
  ImageGenerateRes,
  ImageHistoryRes,
  ImageTableRes,
} from '@/types/image';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * イラスト画像生成のやりとりを表示する
 *
 * @param todayData サーバー側で取得した今日のデータ一覧配列
 * @param realOutput 画像生成時のレスポンスオブジェクト
 * @param type 1が今日、2が7日間
 * @param historyData 過去の指定されたイラスト画像配列
 * @returns
 */
export default function RealImage({
  todayData,
  realOutput,
  type,
  historyData,
}: {
  todayData?: ImageGenerateRes[];
  type: number;
  realOutput?: ImageGenerateRes | null;
  historyData?: ImageHistoryRes | null;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [dataReals, setDataReals] = useState<ImageTableRes[] | null>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  console.log(
    'realImage props',
    todayData,
    realOutput,
    type,
    historyData,
    isLoaded,
  );

  const router = useRouter();

  useEffect(() => {
    console.log('リアル画像1', todayData, type, selectedMenu);
    if (type === DATA.TODAY) {
      // 今日のデータ
      setDataReals(todayData as ImageGenerateRes[]);
      console.log('今日のデータです', dataReals);
    } else if (type === DATA.HISTORY && historyData) {
      // 履歴のデータ
      setDataReals(historyData.data);
    }

    // 新しくデータが格納されてからローディングを外す
    if (dataReals) {
      setLoaded(true);
    }
  }, [todayData]);

  return (
    <>
      {isLoaded && dataReals ? (
        <>
          {/* 今日のデータが１件以上ある場合 */}
          {dataReals.length > 0 ? (
            <div className='relative w-full h-full'>
              <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
                <div className='flex flex-col-reverse'>
                  {dataReals.map((today) => (
                    <div key={today.imageId} className='mt-4'>
                      {/* ユーザー */}
                      <UserCard
                        question={today.prompt}
                        createdAt={today.createdAt}
                      />
                      {/* Irukara */}
                      <ImageOutput
                        imageId={today.imageId}
                        prompt={today.prompt}
                        output={today.outputUrl}
                        shareStatus={today.shareStatus}
                        createdAt={today.createdAt}
                      />
                    </div>
                  ))}
                </div>
              </ScrollBottom>
            </div>
          ) : (
            // 今日のデータがない場合
            <InputPrompt type={selectedMenu} />
          )}
        </>
      ) : (
        <Spin />
      )}
    </>
  );
}
