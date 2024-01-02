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
      icon: <RiChatSmile2Fill className='text-[1.9rem]' />,
      text: 'GPT3.5',
    },
    {
      key: 1,
      icon: <IoLogoWechat className='text-[1.9rem] ' />,
      text: 'GPT3.5',
    },
    {
      key: 2,
      icon: <RiGameFill className='text-[1.9rem]' />,
      text: 'イラスト',
    },
    {
      key: 3,
      icon: <CgGirl className='text-[1.9rem]' />,
      text: 'リアル',
    },
  ];

  return (
    <div className='bg-red-200 w-[350px] md:w-[450px] m-auto rounded-lg'>
      <div className='w-full flex justify-center items-center gap-8 md:gap-10'>
        {items.map((item) => (
          <div
            key={item.key}
            className='py-2 flex flex-col items-center justify-center cursor-pointer'
          >
            {item.icon}
            <div className='text-[0.8rem] text-semibold'>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
