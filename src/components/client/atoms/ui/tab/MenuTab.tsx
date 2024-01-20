import { RiChatSmile2Fill, RiGameFill } from 'react-icons/ri';
import { IoLogoWechat } from 'react-icons/io5';
import { CgGirl } from 'react-icons/cg';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { RootState, store } from '@/store';
import { setSelectedMenuKey } from '@/store/ui/menu/selected/slice';
import { COOKIE_NAME } from '@/common/constants';
import { setCookie } from '@/common/utils/cookie/manageCookies';
import { getSelectedKey } from '@/common/utils/cookie';
import { useSelector } from 'react-redux';

interface MenuProps {
  numSelected: number;
  setSelectedMenu: Dispatch<SetStateAction<number>>;
  setQuestionHolder: Dispatch<SetStateAction<string>>;
}

export default function MenuTab({
  numSelected,
  setSelectedMenu,
  setQuestionHolder,
}: MenuProps) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  const items = [
    {
      key: 0,
      icon: <RiChatSmile2Fill className='text-[1.7rem]' />,
      text: 'GPT3.5',
    },
    {
      key: 1,
      icon: <IoLogoWechat className='text-[1.7rem] ' />,
      text: 'GPT4',
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

  function setHolderText(key: number) {
    if (key === 2) {
      setQuestionHolder(
        'イラストを生成します\nスペースを使用して単語を入力できます',
      );
    } else if (key === 3) {
      setQuestionHolder(
        'リアルな人物画像・背景を生成します\nスペースを使用して単語を入力できます',
      );
    } else {
      setQuestionHolder('Irukaraへの\n質問を書いてください');
    }
  }

  useEffect(() => {
    (async () => {
      const initKey = await getSelectedKey();
      console.log('初期のキー', initKey);
      if (initKey !== 0) {
        setSelectedMenu(initKey);
        setHolderText(initKey);
      }
    })();
  }, []);

  return (
    <div
      className={`fixed z-[2] bottom-[110px] right-0 h-[80px] w-full md:w-[100%-240px] ${
        isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
      }`}
    >
      <div className='bg-slate-50 border-2 border-blue-500 w-[350px] md:w-[450px] m-auto rounded-lg shadow-md'>
        <div className='w-full flex justify-center items-center py-2'>
          {items.map((item) => (
            <ul
              key={item.key}
              className='w-[25%] h-full border-r-4 last:border-r-0'
            >
              <li
                onClick={() => {
                  setSelectedMenu(item.key);
                  store.dispatch(
                    setSelectedMenuKey({ selectedMenu: item.key }),
                  );
                  setCookie(COOKIE_NAME.SELECTED_MENU, item.key.toString());
                  setHolderText(item.key);
                }}
                className={`w-full h-full flex flex-col items-center justify-center cursor-pointer  hover:scale-110 ${
                  numSelected === item.key
                    ? 'text-blue-500 scale-110 font-bold'
                    : 'text-gray-400'
                }`}
              >
                {item.icon}
                <div className='text-[0.7rem] font-semibold mt-1'>
                  {item.text}
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
