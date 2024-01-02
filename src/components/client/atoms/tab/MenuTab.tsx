import { RiChatSmile2Fill, RiGameFill } from 'react-icons/ri';
import { IoLogoWechat } from 'react-icons/io5';
import { CgGirl } from 'react-icons/cg';

interface Tab {
  label: string;
  key: number;
  id: number;
}

interface TabProps {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: number) => void;
}

export default function MenuTab({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: TabProps) {
  console.log();

  const items = [
    {
      key: 0,
      icon: <RiChatSmile2Fill className='text-[1.7rem]' />,
      text: 'GPT3.5',
    },
    {
      key: 1,
      icon: <IoLogoWechat className='text-[1.7rem] ' />,
      text: 'GPT3.5',
    },
    {
      key: 2,
      icon: <RiGameFill className='text-[1.7rem]' />,
      text: 'イラスト',
    },
    {
      key: 3,
      icon: <CgGirl className='text-[1.7rem]' />,
      text: 'リアル',
    },
  ];

  return (
    <div className='bg-slate-50 border-2 border-blue-500 w-[350px] md:w-[450px] m-auto rounded-lg shadow-md'>
      <div className='w-full flex justify-center items-center py-2'>
        {items.map((item) => (
          <ul
            key={item.key}
            className='w-[25%] h-full border-r-4 last:border-r-0'
          >
            <li className='w-full h-full flex flex-col items-center justify-center cursor-pointer text-blue-500 hover:scale-110'>
              {item.icon}
              <div className='text-[0.7rem] font-semibold mt-1'>
                {item.text}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
