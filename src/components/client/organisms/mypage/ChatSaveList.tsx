import { currentTime } from '@/common/libs/dateFromat';
import textTruncate from '@/common/libs/textTruncate';
import { SaveMessageData } from '@/common/types/fetchData';
import { FaCircleQuestion } from 'react-icons/fa6';
import ShareButton from '../../atoms/ShareButton';

interface TextChatProps {
  textChatCount: number;
  textData: SaveMessageData[];
}

export default function ChatSaveList({
  textChatCount,
  textData,
}: TextChatProps) {
  console.log('プロップス', textChatCount, textData);

  return (
    <div className='mt-6'>
      {textChatCount > 0 && Array.isArray(textData) ? (
        textData.map((item) => (
          <div key={item.messageId} className='border-b-2 mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <div className='mr-2'>
                  <FaCircleQuestion className='fill-blue-500 text-xl' />
                </div>
                <div className='text-lg font-semibold'>
                  {textTruncate(item.question, 15)}
                </div>
              </div>
              <div className='text-sm text-gray-500'>
                {currentTime(item.createdAt as number)}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-gray-500 mb-4'>
                {textTruncate(item.answer, 30)}
              </div>
              <ShareButton />
            </div>
          </div>
        ))
      ) : (
        <div>データが見つかりません</div>
      )}
    </div>
  );
}
