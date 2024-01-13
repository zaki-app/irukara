import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import { SELECT_MODE } from '@/common/constants';
import { currentTime } from '@/common/libs/dateFormat';
import ShareButton from '@/components/client/atoms/ui/button/ShareButton';
import Image from 'next/image';

interface ImageOutputProps {
  imageId: string;
  prompt: string;
  output: string;
  createdAt: number;
  shareStatus: number;
}

/**
 * 画像生成時の表示
 * @param param0
 */
export default function ImageOutput({
  imageId,
  prompt,
  output,
  shareStatus,
  createdAt,
}: ImageOutputProps) {
  return (
    <div className='w-full h-full flex justify-between items-center gap-4 border-2 border-blue-200 rounded-lg bg-blue-50 p-4'>
      <div className='w-[calc(100%-200px)] h-auto'>
        <div className='flex-1 h-full flex justify-between flex-col'>
          <Image
            src={irukaraBasic}
            alt={irukaraBasicAlt}
            width={30}
            height={30}
            className='rounded-full border-2 border-blue-500 bg-sky-200 shadow-md h-[30px] mb-4'
          />
          <p className='flex-1 text-sm'>
            <span className='font-semibold text-base'>{prompt}</span>
            の画像を生成しました
          </p>
          <div>
            <ShareButton
              type={SELECT_MODE.ILLUST}
              imageId={imageId}
              createdAt={createdAt}
              shareStatus={shareStatus}
            />
            <p className='h-[30px] flex justify-end text-sm'>
              {currentTime(createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center h-[200px] w-[200px]'>
        <Image
          src={output}
          alt={`${prompt}の生成画像`}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
