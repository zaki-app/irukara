import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import { currentTime } from '@/common/libs/dateFormat';
import Image from 'next/image';

interface AiCardProps {
  answer: string;
  createdAt: number;
}

/**
 * Irukaraの回答カード
 */
export default function AiCard({ answer, createdAt }: AiCardProps) {
  return (
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
        <p className='flex justify-end'>{currentTime(createdAt)}</p>
      </div>
    </div>
  );
}
