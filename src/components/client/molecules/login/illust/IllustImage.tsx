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
import { ImageGenerateRes, ImageTableRes } from '@/types/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * イラスト生成のやりとりを表示する
 * @returns
 */
export default function IllustImage({
  illustOutput,
}: {
  illustOutput: ImageGenerateRes | undefined;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  const [numToday, setToday] = useState<number>(0);
  const [todayIllusts, setTodayIllusts] = useState<ImageTableRes[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
    const path = API.RELAY_GET_IMAGE.replace('{:userId}', userId)
      .replace('{:type}', 'DATE')
      .replace('{:target}', '0')
      .replace('{:imageType}', '1');
    console.log('パス', path);
    const res = await fetch(path);

    if (res.ok) {
      const todayData = await res.json();
      console.log('today data...', todayData.count);
      // 今日のイラスト画像を格納
      setTodayIllusts(todayData.data);
      setToday(todayData.count);
    } else {
      console.log('today data fetch error...', res);
    }
  }

  useEffect(() => {
    if (selectedMenu === 2) {
      (async () => {
        console.log('illust useEffect1');
        await getTodayMessage();
        console.log('illust useEffect2 ここになったらデータが表示される');
        setLoaded(true);
      })();
    }
  }, []);

  // 生成された画像データを配列に入れる
  useEffect(() => {
    if (illustOutput) {
      setTodayIllusts((prev) => [illustOutput, ...prev]);
      setToday((prev) => prev + 1);
      console.log('追加の時のみ呼ばれるようにしたい', illustOutput);
      store.dispatch(setScroll({ isScroll: true }));
    }
  }, [illustOutput]);

  return (
    <div className='relative w-full h-full'>
      {isLoaded && numToday > 0 ? (
        <ScrollBottom className='relative w-full h-full overflow-y-auto px-2 md:px-4'>
          <div className='flex flex-col-reverse'>
            {todayIllusts.map((today) => (
              <div key={today.imageId} className='mt-4'>
                {/* ユーザー */}
                <UserCard question={today.prompt} createdAt={today.createdAt} />
                {/* Irukara */}
                <ImageOutput
                  prompt={today.prompt}
                  output={today.outputUrl}
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
