'use client';

import { useEffect, useMemo, useState } from 'react';
import { RootState, store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import { GetUserIdRes } from '@/types/auth/api';
import { useSelector } from 'react-redux';
import { API } from '@/common/constants/path';
import { useChat, Message } from 'ai/react';
import { ImageGenerateRes } from '@/types/image';
import { MessageType } from '@/types/message';
import { DATA, SELECT_MODE } from '@/common/constants';
import { Spin } from 'antd';
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
  const [isData, setData] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useMemo(() => {
    // userIdとstatusをreduxへ
    if (type === 1 && userData) {
      store.dispatch(
        setAuthUserData({
          userId: userData.userId,
          status: userData.status,
        }),
      );
    }
    // if (todayData && todayData.length > 0) {
    //   setData(true);
    // }
  }, []);

  const [question, setQuestion] = useState<string>('');
  const [isAnswer, setAnswer] = useState<boolean>(false);
  const [isInput, setInput] = useState<boolean>(true);
  const [questionHolder, setQuestionHolder] = useState<string>(
    'Irukaraへの\n質問を書いてください',
  );
  // 選択しているメニュー番号
  const [numSelected, setSelectedMenu] = useState<number>(selectedMode);
  const [illustOutput, setIllustOutput] = useState<ImageGenerateRes>();
  const [realOutput, setRealOutput] = useState<ImageGenerateRes>();
  const [newMessage, setNewMessage] = useState<MessageType>();
  const [arrTodayData, setArrTodayData] = useState<
    MessageType[] | ImageGenerateRes[]
  >([]);

  useMemo(() => {
    console.log('生成エリア', selectedMode);
    // tab切り替えで再度データを格納してからpropsで渡す
    console.log('生成エリア今日のデータ', todayData);
    if (selectedMode === SELECT_MODE.GPT3) {
      setArrTodayData(todayData as MessageType[]);
    } else if (
      selectedMode === SELECT_MODE.ILLUST ||
      selectedMode === SELECT_MODE.REAL
    ) {
      setArrTodayData(todayData as ImageGenerateRes[]);
    }

    setLoaded(true);
  }, [selectedMode]);

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
        {isLoaded ? (
          <>
            {numSelected === SELECT_MODE.GPT3 && (
              <ChatGpt
                todayData={arrTodayData as MessageType[]}
                messages={messages}
                newMessage={newMessage}
                type={DATA.TODAY}
              />
            )}
            {numSelected === SELECT_MODE.GPT4 && '準備中です'}
            {numSelected === SELECT_MODE.ILLUST && (
              <IllustImage
                todayData={arrTodayData as ImageGenerateRes[]}
                illustOutput={illustOutput}
                type={DATA.TODAY}
              />
            )}
            {numSelected === SELECT_MODE.REAL && (
              <RealImage
                todayData={arrTodayData as ImageGenerateRes[]}
                realOutput={realOutput}
                type={DATA.TODAY}
              />
            )}
          </>
        ) : (
          <Spin />
        )}
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
        setQuestion={setQuestion}
        setQuestionHolder={setQuestionHolder}
        setData={setData}
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
