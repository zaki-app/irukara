'use client';

import { COOKIE_NAME } from '@/common/constants';
import { API } from '@/common/constants/path';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import ImageOutput from '@/components/client/atoms/login/chat/ImageOutput';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import ScrollBottom from '@/components/client/atoms/scroll/ScrollBottom';
import { RootState, store } from '@/store';
import { setScroll } from '@/store/ui/scroll/slice';
import {
  ImageGenerateRes,
  ImageHistoryRes,
  ImageTableRes,
} from '@/types/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * イラスト生成のやりとりを表示する
 * @returns
 */
export default function RealImage({
  realOutput,
  type,
  historyData,
}: {
  type: number;
  realOutput?: ImageGenerateRes | undefined;
  historyData?: ImageHistoryRes;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  console.log('履歴画像', type, realOutput, historyData);

  const [numDataCount, setDataCount] = useState<number>(0);
  const [dataReals, setDataReals] = useState<ImageTableRes[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
    const path = API.RELAY_GET_IMAGE.replace('{:userId}', userId)
      .replace('{:type}', 'DATE')
      .replace('{:target}', '0')
      .replace('{:imageType}', '2');
    console.log('パス', path);
    const res = await fetch(path);

    if (res.ok) {
      const todayData = await res.json();
      console.log('today data...', todayData.count);
      // 今日のイラスト画像を格納
      setDataReals(todayData.data);
      setDataCount(todayData.count);
    } else {
      console.log('today data fetch error...', res);
    }
  }

  useEffect(() => {
    if (selectedMenu === 2 && type === 1) {
      (async () => {
        console.log('illust useEffect1');
        await getTodayMessage();
        console.log('illust useEffect2 ここになったらデータが表示される');
        setLoaded(true);
      })();
    } else if (type === 2 && historyData) {
      console.log('過去の画像生成');
      setDataReals(historyData?.data);
      setDataCount(historyData?.count);
      setLoaded(true);
    }
  }, []);

  // 生成された画像データを配列に入れる
  useEffect(() => {
    if (realOutput) {
      setDataReals((prev) => [realOutput, ...prev]);
      setDataCount((prev) => prev + 1);
      console.log('追加の時のみ呼ばれるようにしたい', realOutput);
      store.dispatch(setScroll({ isScroll: true }));
    }
  }, [realOutput]);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numDataCount > 0 ? (
        <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
          <div className='flex flex-col-reverse'>
            {dataReals.map((today) => (
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
        <InputPrompt type={3} />
      )}
    </div>
  );
}
