'use client';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MessageType } from '@/types/message';
import { ImageGenerateRes } from '@/types/image';
import ChatGpt from './login/chatgpt/ChatGpt';
import IllustImage from './login/illust/IllustImage';

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
  console.log('今日以外のデータです', type, selectedMenu);

  return (
    <div className='pt-[1rem]'>
      {type === 0 && (
        <ChatGpt type={2} historyData={data as HistoryDataProps} />
      )}
      {type === 2 && (
        <IllustImage type={2} historyData={data as HistoryImageData} />
      )}
    </div>
  );
}
