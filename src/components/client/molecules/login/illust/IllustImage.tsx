'use client';

import { DATA, SELECT_MODE } from '@/common/constants';
import ImageOutput from '@/components/client/atoms/login/chat/ImageOutput';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState, store } from '@/store';
import { setScroll } from '@/store/ui/scroll/slice';
import { setSpinner } from '@/store/ui/spinner/slice';
import {
  ImageGenerateRes,
  ImageHistoryRes,
  ImageTableRes,
} from '@/types/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

/**
 * イラスト画像生成のやりとりを表示する
 *
 * @param todayData サーバー側で取得した今日のデータ一覧配列
 * @param illustOutput 画像生成時のレスポンスオブジェクト
 * @param type 1が今日、2が7日間
 * @param historyData 過去の指定されたイラスト画像配列
 * @returns
 */
export default function IllustImage({
  todayData,
  illustOutput,
  type,
  historyData,
}: {
  todayData?: ImageGenerateRes[];
  type: number;
  illustOutput?: ImageGenerateRes | undefined;
  historyData?: ImageHistoryRes;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [numDataCount, setDataCount] = useState<number>(0);
  const [dataIllusts, setDataIllusts] = useState<ImageTableRes[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenu === SELECT_MODE.ILLUST && type === DATA.TODAY) {
      // 今日のデータ
      store.dispatch(setSpinner({ isSpinner: true }));
      setDataIllusts(todayData as ImageGenerateRes[]);
      setDataCount(todayData?.length as number);
      setLoaded(true);
      store.dispatch(setSpinner({ isSpinner: false }));
    } else if (type === DATA.HISTORY && historyData) {
      // 履歴のデータ
      store.dispatch(setSpinner({ isSpinner: true }));
      setDataIllusts(historyData.data);
      setDataCount(historyData.count);
      setLoaded(true);
      store.dispatch(setSpinner({ isSpinner: false }));
    }
  }, [todayData]);

  // 生成された画像データを配列に入れる
  useEffect(() => {
    if (illustOutput) {
      setDataIllusts((prev) => [illustOutput, ...prev]);
      setDataCount((prev) => prev + 1);
      console.log('追加の時のみ呼ばれるようにしたい', illustOutput);
      store.dispatch(setScroll({ isScroll: true }));
    }
  }, [illustOutput]);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numDataCount > 0 ? (
        <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
          <div className='flex flex-col-reverse'>
            {dataIllusts.map((today) => (
              <div key={today.imageId} className='mt-4'>
                {/* ユーザー */}
                <UserCard question={today.prompt} createdAt={today.createdAt} />
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
      ) : (
        <Spin />
      )}
    </div>
  );
}
