'use client';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MessageType } from '@/types/message';
import { ImageGenerateRes } from '@/types/image';
import { DATA, SELECT_MODE } from '@/common/constants';
import ChatGpt from './login/chatgpt/ChatGpt';
import IllustImage from './login/illust/IllustImage';
import RealImage from './login/real/RealImage';

interface HistoryDataProps {
  count: number;
  data: MessageType[];
}

interface HistoryImageData {
  count: number;
  data: ImageGenerateRes[];
}

export default function HistoryData({
  data,
  type,
}: {
  data: HistoryDataProps | HistoryImageData;
  type: number;
}) {
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );
  console.log('今日以外のデータです', data);

  return (
    <div className='pt-[1rem]'>
      {type === SELECT_MODE.GPT3 && (
        <ChatGpt type={DATA.HISTORY} historyData={data as HistoryDataProps} />
      )}
      {type === SELECT_MODE.ILLUST && (
        <IllustImage
          type={DATA.HISTORY}
          historyData={data as HistoryImageData}
        />
      )}
      {type === SELECT_MODE.REAL && (
        <RealImage type={DATA.HISTORY} historyData={data as HistoryImageData} />
      )}
    </div>
  );
}
