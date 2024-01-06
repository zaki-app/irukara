'use client';

import { useEffect, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import { GetUserIdRes } from '@/types/auth/api';
import { useSelector } from 'react-redux';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { setMenuArea } from '@/store/ui/menu/slice';
import { commonValidate } from '@/common/utils/varidate/input';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { API } from '@/common/constants/path';
import { useChat, Message } from 'ai/react';
import { setScroll } from '@/store/ui/scroll/slice';
import { imageGenerate } from '@/common/libs/api/image/imageGenerate';
import { ImageGenerateRes } from '@/types/image';
import ChatGpt from './chatgpt/ChatGpt';
import MenuTab from '../../atoms/tab/MenuTab';
import IllustImage from './illust/IllustImage';
import ChatTextArea from '../../atoms/login/chat/ChatTextArea';

/**
 * 各生成エリア
 */
export default function GenerateArea({ data }: { data: GetUserIdRes }) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { isMenu } = useSelector((state: RootState) => state.menuSlice);
  const { userId, status } = useSelector(
    (state: RootState) => state.authUserDataSlice,
  );
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );

  useEffect(() => {
    // userIdとstatusをreduxへ
    store.dispatch(
      setAuthUserData({
        userId: data.userId,
        status: data.status,
      }),
    );
  }, []);

  const [question, setQuestion] = useState<string>('');
  const [isAnswer, setAnswer] = useState<boolean>(false);
  const [isInput, setInput] = useState<boolean>(true);
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [questionHolder, setQuestionHolder] = useState<string>(
    'Irukaraへの\n質問を書いてください',
  );
  // 選択しているメニュー番号
  const [numSelected, setSelectedMenu] = useState<number>(0);
  const [illustOutput, setIllustOutput] = useState<ImageGenerateRes>();

  const { messages, handleInputChange, handleSubmit, isLoading } = useChat({
    api: API.TOP_GPT,
    onFinish: async (message: Message) => {
      setQuestionHolder('Irukaraへの\n質問を書いてください');
      setAnswer(false);
      setInput(true);
      const params = {
        userId,
        question,
        answer: message.content,
        memberStatus: status,
      };

      // dynamodbへの保存処理
      const path = API.RELAY_POST_MSG.replace('{:type}', 'POST_MSG');
      const res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(params),
      });

      // if (res.ok) {
      //   // 正常に保存処理が終了した時
      //   setResStatus(true);
      // }
    },
  });

  return (
    <div className='relative h-full w-full flex-1 flex flex-col transition-width overflow-hidden'>
      {/* 生成されたやり取りコンポーネント */}
      <div
        className={`fixed w-full h-full flex-1 z-[1] overflow-hidden top-[5.5rem] right-0 ${
          isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
        } 
        ${isMenu ? 'pb-[18.4rem]' : 'pb-[13rem]'}`}
      >
        {numSelected === 0 && <ChatGpt messages={messages} />}
        {numSelected === 1 && '準備中です'}
        {numSelected === 2 && <IllustImage illustOutput={illustOutput} />}
        {numSelected === 3 && 'リアルが出現'}
      </div>
      {/* 切り替えメニュー */}
      {isMenu && (
        <div
          className={`fixed z-[2] bottom-[110px] right-0 h-[80px] w-full md:w-[100%-240px] ${
            isSidebar ? 'md:w-[calc(100%-240px)]' : 'md:w-[calc(100%-48px)]'
          }`}
        >
          <MenuTab
            setSelectedMenu={setSelectedMenu}
            numSelected={numSelected}
            setQuestionHolder={setQuestionHolder}
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
            if (question) {
              setQuestionHolder('回答を作成中です');
              setAnswer(false);

              if (selectedMenu === 0) {
                handleSubmit(e);
              } else if (selectedMenu === 1) {
                // chatGPT4
              } else if (selectedMenu === 2) {
                // イラスト生成
                const illustRes = await imageGenerate({
                  userId,
                  prompt: question,
                  memberStatus: status,
                  type: 2,
                });
                if (illustRes) setIllustOutput(illustRes);
                console.log('イラスト生成するボタンをクリック', illustRes);
              } else if (selectedMenu === 3) {
                console.log('リアル画像生成クリック');
              }

              setQuestion('');
            }
          }}
          className='w-full border-2 border-blue-500 rounded-lg mx-2 my-2'
        >
          <textarea
            value={question}
            readOnly={isAnswer}
            onChange={(e) => {
              setQuestion(e.target.value);
              // scrollをreduxへ
              store.dispatch(setScroll({ isScroll: true }));
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
              if (!validate.result) {
                handleInputChange(e);
              }
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
    </div>
  );
}
