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
  console.log('今日以外のデータです', data, type);
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <div className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
      <div
        className={`fixed w-full h-full flex-1 z-[1] overflow-y-auto top-[5.5rem] right-0 pb-[8rem] ${
          isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
        }`}
      >
        <div className='pt-[1rem]'>
          {type === 0 && (
            <ChatGpt type={2} historyData={data as HistoryDataProps} />
          )}
          {type === 2 && (
            <IllustImage type={2} historyData={data as HistoryImageData} />
          )}
        </div>
      </div>
    </div>
  );
}
