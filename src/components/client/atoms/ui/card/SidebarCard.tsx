import { RootState } from '@/store';
import { IoChatboxEllipses, IoTodaySharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';
import { RiChatHistoryFill } from 'react-icons/ri';

/**
 * サイドバーのアイコンとテキスト
 * @param path
 * @param text
 * @param type 1..share, 2...today, 3...history, 4...account, 5...signout
 * @returns
 */
export default function SidebarCard({
  path,
  text,
  type,
}: {
  path: string;
  text: string;
  type: number;
}) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  return (
    <div className='bg-white rounded-md shadow-sm py-2 px-4 mb-2 text-sm font-semibold flex justify-start gap-4 items-center'>
      {type === 1 && <FaShareAlt className='text-blue-500 text-base' />}
      {type === 2 && <IoTodaySharp className='text-blue-500 text-base' />}
      {type === 3 && <RiChatHistoryFill className='text-blue-500 text-base' />}
      {isSidebar && <Link href={path}>{text}</Link>}
    </div>
  );
}
