'use client';

import { useEffect, useRef, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import useTabs from '@/hooks/useTabs';
import { GetUserIdRes } from '@/types/auth/api';
import { BsFillChatDotsFill, BsWechat } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { setMenuArea } from '@/store/ui/menu/slice';
import { commonValidate } from '@/common/utils/varidate/input';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { setChatValue } from '@/store/input/chat/slice';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import CSSTabs from '../../atoms/tab/CSSTabs';
import BottomTab from '../../atoms/tab/BottomTab';
import ChatTextArea from '../../atoms/login/chat/ChatTextArea';
import MenuTab from '../../atoms/tab/MenuTab';

/**
 * 各生成エリア
 */
export default function GenerateArea({ data }: { data: GetUserIdRes }) {
  const chatgptRef = useRef(null);

  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { isMenu } = useSelector((state: RootState) => state.menuSlice);

  useEffect(() => {
    // userIdとstatusをreduxへ
    store.dispatch(
      setAuthUserData({
        userId: data.userId,
        status: data.status,
      }),
    );
  }, []);

  const [hookProps] = useState({
    tabs: [
      {
        id: 0,
        key: 1,
        label: 'GPT3.5',
        icon: <BsFillChatDotsFill />,
        children: <ChatGpt />,
      },
      {
        id: 1,
        key: 2,
        label: 'GPT4.0',
        icon: <BsWechat />,
        children: 'tab2',
      },
      {
        id: 2,
        key: 3,
        label: 'イラスト',
        icon: <BsWechat />,
        children: 'tab3',
      },
      {
        id: 3,
        key: 4,
        label: 'リアル',
        icon: <BsWechat />,
        children: 'tab4',
      },
    ],
    initialTabKey: 1,
  });

  const [question, setQuestion] = useState<string>('');
  const [isAnswer, setAnswer] = useState<boolean>(false);
  const [isInput, setInput] = useState<boolean>(true);
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [questionHolder, setQuestionHolder] = useState<string>(
    'Irukaraへの\n質問を書いてください',
  );

  const { tabProps, selectedTab } = useTabs(hookProps);

  return (
    <main className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
      <div className='w-full h-full flex-1 overflow-y-auto z-[1] pt-[40px] mb-[120px]'>
        {/* {selectedTab.children} */}
        <ChatGpt />
      </div>
      {/* bottom tab */}
      {isMenu && (
        <div
          className={`fixed z-[2] bottom-[85px] right-0 h-[60px] w-full md:w-[100%-240px] ${
            isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
          }`}
        >
          <MenuTab
            tabs={tabProps.tabs}
            selectedTabIndex={tabProps.selectedTabIndex}
            setSelectedTab={tabProps.setSelectedTab}
          />
        </div>
      )}
      {/* 生成textarea */}
      <div
        className={`fixed z-[2] h-[85px] bottom-[30px] right-0 flex bg-white w-full md:w-[100%-240px] ${
          isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
        } `}
      >
        <div
          className='mx-2 text-2xl text-blue-500 cursor-pointer flex justify-center items-center'
          onClick={() => {
            store.dispatch(setMenuArea({ isMenu: !isMenu }));
          }}
        >
          {isMenu ? <TbTriangleInvertedFilled /> : <TbTriangleFilled />}
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setQuestionHolder('回答を作成中です');
            if (question) {
              console.log('質問です', question);
              // reduxへ通知
              store.dispatch(setChatValue({ chatValue: question }));
              setQuestion('');
              setAnswer(false);
            }
            console.log('on onSubmit', e);
          }}
          className='w-full border-2 border-blue-500 rounded-lg mx-2 my-2'
        >
          <textarea
            value={question}
            readOnly={isAnswer}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (question.length > 0) {
                setInput(false);
              } else {
                setInput(true);
              }
              const validate = commonValidate(question, 500);
              if (e.target.value.length > 250) {
                setQuestion(e.target.value.slice(0, 250));
              } else {
                setQuestion(e.target.value);
              }
              setValidate(validate.result);
              if (validate.text.length > 0) {
                setErrorMsg(validate.text);
              }
              // if (!validate.result) {
              //   handleInputChange(e);
              // }
              // console.log('バリデーション', validate);
            }}
            placeholder={questionHolder}
            className='w-full flex-1 border-none outline-none text-base resize-none py-2 px-2 '
          />
          <div className='absolute bottom-[0.7rem] right-[1rem]'>
            <button
              className={`text-white text-xl p-1 rounded-full bg-blue-500 ${
                isInput ? 'opacity-70' : ''
              }`}
              disabled={isInput}
            >
              <FaAngleDoubleRight className='text-right' />
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
      <div className='fixed overflow-hidden bottom-0 right-0 w-full z-[12] h-[30px]'>
        <div className='bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
          <span>
            Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
          </span>
        </div>
      </div>
    </main>
  );
}
