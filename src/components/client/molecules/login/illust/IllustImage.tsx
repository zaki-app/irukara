'use client';

import { DATA, SELECT_MODE } from '@/common/constants';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
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
import { Input, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

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
  illustOutput?: ImageGenerateRes | null;
  historyData?: ImageHistoryRes | null;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [numDataCount, setDataCount] = useState<number>(0);
  const [dataIllusts, setDataIllusts] = useState<ImageTableRes[] | null>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  console.log('最初のデータを確認したい　イラスト', todayData, dataIllusts);

  // console.log(
  //   'illustImage props',
  //   todayData,
  //   illustOutput,
  //   type,
  //   historyData,
  //   isLoaded,
  // );

  useMemo(() => {
    // console.log('イラスト画像1', todayData, type, selectedMenu);
    if (selectedMenu === SELECT_MODE.ILLUST && type === DATA.TODAY) {
      // 今日のデータ
      setDataIllusts(todayData as ImageGenerateRes[]);
      // setLoaded(true);
    } else if (type === DATA.HISTORY && historyData) {
      // 履歴のデータ
      setDataIllusts(historyData.data);
      // setLoaded(true);
      // store.dispatch(setSpinner({ isSpinner: false }));
    }
    // console.log('イラスト画像終了', dataIllusts === null);

    // 新しくデータが格納されてからローディングを外す
    if (dataIllusts) {
      setLoaded(true);
    }
  }, [selectedMenu, todayData]);

  // 生成された画像データを配列に入れる
  // useEffect(() => {
  //   // if (illustOutput) {
  //   //   setDataIllusts((prev) => [illustOutput, ...(prev as ImageGenerateRes[])]);
  //   //   // setDataCount((prev) => prev + 1);
  //   //   console.log('追加の時のみ呼ばれるようにしたい', illustOutput);
  //   //   store.dispatch(setScroll({ isScroll: true }));
  //   // }
  //   // if (illustOutput) {
  //   //   setDataIllusts(illustOutput as ImageGenerateRes[]);
  //   // }
  //   // setLoaded(true);
  //   // return () => {
  //   //   setLoaded(false);
  //   // };
  // }, [isLoaded]);

  return (
    <>
      {isLoaded && dataIllusts ? (
        <>
          {/* 今日のデータが１件以上ある場合 */}
          {dataIllusts.length > 0 ? (
            <div className='relative w-full h-full'>
              <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
                <div className='flex flex-col-reverse'>
                  {dataIllusts.map((today) => (
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
