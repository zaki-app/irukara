import { RootState } from '@/store';
import { IoTodaySharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { FaShareAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { RiChatHistoryFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { SiMoneygram } from 'react-icons/si';

/**
 * サイドバーのアイコンとテキスト
 * @param path
 * @param text
 * @param type 1..share, 2...today, 3...history, 4...profile, 5...plan, 6...signout
 * @param onClick
 * @returns
 */
export default function SidebarCard({
  path,
  text,
  type,
  onClick,
}: {
  path: string;
  text: string;
  type: number;
  onClick?: () => void;
}) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <div className='bg-white rounded-md shadow-sm py-2 px-4 mb-2 text-sm font-semibold flex justify-start gap-4 items-center'>
      {type === 1 && <FaShareAlt className='text-blue-500 text-base' />}
      {type === 2 && <IoTodaySharp className='text-blue-500 text-base' />}
      {type === 3 && <RiChatHistoryFill className='text-blue-500 text-base' />}
      {type === 4 && <CgProfile className='text-blue-500 text-base' />}
      {type === 5 && <SiMoneygram className='text-blue-500 text-base' />}
      {type === 6 && <FaSignOutAlt className='text-blue-500 text-base' />}
      {isSidebar && (
        <Link
          href={path}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          {text}
        </Link>
      )}
    </div>
  );
}
