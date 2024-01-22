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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IllustImageProps {
  todayData?: ImageGenerateRes[];
  type: number;
  illustOutput?: ImageGenerateRes | null;
  historyData?: ImageHistoryRes | null;
  isIllustTaking?: boolean;
}

/**
 * イラスト画像生成のやりとりを表示する
 *
 * @param todayData サーバー側で取得した今日のデータ一覧配列
 * @param illustOutput 画像生成時のレスポンスオブジェクト
 * @param type 1が今日、2が7日間
 * @param historyData 過去の指定されたイラスト画像配列
 * @param isTaking やり取り画面への切り替え
 * @returns
 */
export default function IllustImage({
  todayData,
  illustOutput,
  type,
  historyData,
  isIllustTaking,
}: IllustImageProps) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );
  console.log('イラストアウトプット', illustOutput);

  const [dataIllusts, setDataIllusts] = useState<ImageTableRes[] | null>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  console.log('illust props', todayData, dataIllusts);

  useEffect(() => {
    if (type === DATA.TODAY) {
      // 今日のデータ
      setDataIllusts(todayData as ImageGenerateRes[]);
    } else if (type === DATA.HISTORY && historyData) {
      // 履歴のデータ
      setDataIllusts(historyData.data);
    }

    // 新しくデータが格納されてからローディングを外す
    if (dataIllusts || isIllustTaking) {
      setLoaded(true);
      console.log('ここに入った', dataIllusts, isIllustTaking);
    }
  }, [todayData]);

  return (
    <>
      {isLoaded && dataIllusts ? (
        <>
          {/* 今日のデータが１件以上ある場合 */}
          {dataIllusts.length > 0 || isIllustTaking ? (
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
                {/* 追加のやり取り */}
                {illustOutput && (
                  <>
                    <UserCard
                      question={illustOutput.prompt}
                      createdAt={illustOutput.createdAt}
                    />
                    <ImageOutput
                      imageId={illustOutput.imageId}
                      prompt={illustOutput.prompt}
                      output={illustOutput.outputUrl}
                      shareStatus={illustOutput.shareStatus}
                      createdAt={illustOutput.createdAt}
                    />
                  </>
                )}
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
