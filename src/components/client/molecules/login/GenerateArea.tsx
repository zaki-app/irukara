'use client';

import { useEffect, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import { GetUserIdRes } from '@/types/auth/api';
import { useSelector } from 'react-redux';
import { API } from '@/common/constants/path';
import { useChat, Message } from 'ai/react';
import { ImageGenerateRes } from '@/types/image';
import { MessageType } from '@/types/message';
import { DATA, SELECT_MODE } from '@/common/constants';
import ChatGpt from './chatgpt/ChatGpt';
import MenuTab from '../../atoms/ui/tab/MenuTab';
import IllustImage from './illust/IllustImage';
import RealImage from './real/RealImage';
import GenerateInput from '../../atoms/input/GenerateInput';

interface GenerateAreaProps {
  userData: GetUserIdRes;
  todayData: MessageType[] | ImageGenerateRes[];
  type: number;
  selectedMode: number;
}

/**
 * 各生成エリア
 * @param userData ログインユーザー情報
 * @param todayData 今日の取得データ
 * @param type ??
 * @param selectedMode cookieに保存している選択番号
 */
export default function GenerateArea({
  userData,
  todayData,
  type,
  selectedMode,
}: GenerateAreaProps) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { isMenu } = useSelector((state: RootState) => state.menuSlice);
  const { userId, status } = useSelector(
    (state: RootState) => state.authUserDataSlice,
  );
  const [todayMessagesData, setTodayMessageData] = useState<MessageType[]>([]);
  const [todayIllustsData, setTodayIllustsData] = useState<ImageGenerateRes[]>(
    [],
  );
  const [todayRealsData, setTodayRealsData] = useState<ImageGenerateRes[]>([]);

  useEffect(() => {
    // userIdとstatusをreduxへ
    if (type === 1 && userData) {
      store.dispatch(
        setAuthUserData({
          userId: userData.userId,
          status: userData.status,
        }),
      );
    }
  }, []);

  useEffect(() => {
    console.log('GenerateArea最初', todayData);
    if (selectedMode === SELECT_MODE.GPT3) {
      setTodayMessageData(todayData as MessageType[]);
    } else if (selectedMode === SELECT_MODE.ILLUST) {
      setTodayIllustsData(todayData as ImageGenerateRes[]);
    } else if (selectedMode === SELECT_MODE.REAL) {
      setTodayRealsData(todayData as ImageGenerateRes[]);
    }
  }, [todayData]);

  const [question, setQuestion] = useState<string>('');
  const [isAnswer, setAnswer] = useState<boolean>(false);
  const [isInput, setInput] = useState<boolean>(true);
  const [questionHolder, setQuestionHolder] = useState<string>(
    'Irukaraへの\n質問を書いてください',
  );
  const [numSelected, setSelectedMenu] = useState<number>(selectedMode);
  const [illustOutput, setIllustOutput] = useState<ImageGenerateRes>();
  const [realOutput, setRealOutput] = useState<ImageGenerateRes>();
  const [newMessage, setNewMessage] = useState<MessageType>();
  const [isTaking, setTaking] = useState<boolean>(false);
  const [isIllustTaking, setIllustTaking] = useState<boolean>(false);
  const [isRealTaking, setRealTaking] = useState<boolean>(false);

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
      if (res.ok) {
        const resJson = await res.json();
        setNewMessage(resJson.body.data);
      }
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
        <>
          {numSelected === SELECT_MODE.GPT3 && (
            <ChatGpt
              todayData={todayMessagesData as MessageType[]}
              messages={messages}
              newMessage={newMessage}
              type={DATA.TODAY}
              isTaking={isTaking}
            />
          )}
          {numSelected === SELECT_MODE.GPT4 && '準備中です'}
          {numSelected === SELECT_MODE.ILLUST && (
            <IllustImage
              todayData={todayIllustsData as ImageGenerateRes[]}
              illustOutput={illustOutput}
              type={DATA.TODAY}
              isIllustTaking={isIllustTaking}
            />
          )}
          {numSelected === SELECT_MODE.REAL && (
            <RealImage
              todayData={todayRealsData as ImageGenerateRes[]}
              realOutput={realOutput}
              type={DATA.TODAY}
              isRealTaking={isRealTaking}
            />
          )}
        </>
      </div>
      {/* 切り替えメニュー */}
      {isMenu && (
        <MenuTab
          setSelectedMenu={setSelectedMenu}
          numSelected={numSelected}
          setQuestionHolder={setQuestionHolder}
        />
      )}
      {/* 生成textarea */}
      <GenerateInput
        question={question}
        questionHolder={questionHolder}
        isInput={isInput}
        isAnswer={isAnswer}
        setTaking={setTaking}
        setIllustTaking={setIllustTaking}
        setRealTaking={setRealTaking}
        setQuestion={setQuestion}
        setQuestionHolder={setQuestionHolder}
        setAnswer={setAnswer}
        handleSubmit={handleSubmit}
        setIllustOutput={setIllustOutput}
        setRealOutput={setRealOutput}
        setInput={setInput}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
