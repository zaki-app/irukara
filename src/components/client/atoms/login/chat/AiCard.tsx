import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import { currentTime } from '@/common/libs/dateFormat';
import { MessageType } from 'antd/es/message/interface';
import Image from 'next/image';
import { SELECT_MODE } from '@/common/constants';
import Link from 'next/link';
import ShareButton from '../../ui/button/ShareButton';

interface AiCardProps {
  answer: string;
  createdAt: number;
  messageId?: string;
  shareStatus?: number;
  isShareButton?: boolean;
}

/**
 * Irukaraの回答カード
 */
export default function AiCard({
  answer,
  createdAt,
  messageId,
  shareStatus,
  isShareButton,
}: AiCardProps) {
  return (
    <>
      {isShareButton ? (
        <div className='flex justify-start items-start border-2 border-blue-200 rounded-lg bg-blue-50 p-4 mb-2'>
          <Image
            src={irukaraBasic}
            alt={irukaraBasicAlt}
            width={30}
            height={30}
            className='rounded-full border-2 border-blue-500 bg-sky-200 shadow-md'
          />
          <div className='flex flex-col ml-4 w-full'>
            <p>{answer}</p>
            <div className='flex justify-between items-center'>
              {isShareButton && (
                <ShareButton
                  type={SELECT_MODE.GPT3}
                  messageId={messageId}
                  createdAt={createdAt}
                  shareStatus={Number(shareStatus)}
                />
              )}
              <p className='flex justify-end'>{currentTime(createdAt)}</p>
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/interaction/c/${messageId}and${createdAt}`}>
          <div className='flex justify-start items-start border-2 border-blue-200 rounded-lg bg-blue-50 p-4 mb-2'>
            <Image
              src={irukaraBasic}
              alt={irukaraBasicAlt}
              width={30}
              height={30}
              className='rounded-full border-2 border-blue-500 bg-sky-200 shadow-md'
            />
            <div className='flex flex-col ml-4 w-full'>
              <p>{answer}</p>
              <div className='flex justify-between items-center'>
                {isShareButton && (
                  <ShareButton
                    type={SELECT_MODE.GPT3}
                    messageId={messageId}
                    createdAt={createdAt}
                    shareStatus={Number(shareStatus)}
                  />
                )}
                <p className='flex justify-end'>{currentTime(createdAt)}</p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
