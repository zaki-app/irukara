'use client';

import { API } from '@/common/constants/path';
import { currentUnix } from '@/common/libs/dateFormat';
import { commonValidate } from '@/common/utils/varidate/input';
import InputPrompt from '@/components/client/atoms/login/InputPrompt';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import { RootState } from '@/store';
import { MessageType } from '@/types/message';
import { useChat, Message } from 'ai/react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function ChatGpt() {
  // userId, statusを取得
  const { userId, status } = useSelector(
    (state: RootState) => state.authUserDataSlice,
  );

  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [question, setQuestion] = useState<string>('');
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isNext, setNext] = useState<boolean>(false);
  const [isResStatus, setResStatus] = useState<boolean>(false);
  const [numToday, setToday] = useState<number>(0);
  const [todayMessages, setTodayMessages] = useState<MessageType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isAnswer, setAnswer] = useState<boolean>(false);
  const [isInput, setInput] = useState<boolean>(true);
  const [questionHolder, setQuestionHolder] = useState<string>(
    'Irukaraへの\n質問を書いてください',
  );

  // スクロールを一番下へ
  function scrollDown() {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      console.log('スクロールtrue');
    }
  }

  const { messages, handleInputChange, handleSubmit, isLoading } = useChat({
    api: API.TOP_GPT,
    onFinish: async (message: Message) => {
      scrollDown();
      setQuestionHolder('Irukaraへの質問を書いてください');
      setAnswer(false);
      setInput(true);
      const params = {
        userId,
        question,
        answer: message.content,
        memberStatus: status,
      };

      const path = API.RELAY_POST_MSG.replace('{:type}', 'POST_MSG');
      const res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (res.ok) {
        // 正常に保存処理が終了した時
        setResStatus(true);
      }
    },
  });

  // 質問を送信
  async function onSubmitFn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuestionHolder('回答を作成中です');
    if (question) {
      setQuestion('');
      handleSubmit(e);
      setNext(true);
      scrollDown();
      setAnswer(false);
    }
  }

  function textValidate(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > 0) {
      setInput(false);
    } else {
      setInput(true);
    }
    const validate = commonValidate(e.target.value, 250);
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
  }

  // 今日の保存データを取得
  // TODO 画面には今日のデータを表示して、追加されたらこれが入っている配列に入れる
  async function getTodayMessage() {
    const path = API.RELAY_GET_MSG.replace('{:type}', 'DATE').replace(
      '{:target}',
      '0',
    );
    const res = await fetch(path);
    if (res.ok) {
      const todayData = await res.json();
      console.log('今日のデータ', todayData.count);
      // 今日のメッセージを格納
      setTodayMessages(todayData.data);
      setToday(todayData.count);
    }
  }

  useEffect(() => {
    (async () => {
      console.log('useEffect1');
      await getTodayMessage();
      console.log('useEffect2 ここになったらデータが表示される');
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      scrollDown();
    }
  }, [isLoaded]);

  return (
    <>
      {/* やり取り */}
      <div className='flex-1 overflow-hidden h-[calc(100%-100px)]'>
        <div className='relative h-full overflow-y-auto px-2'>
          {isLoaded && numToday > 0 ? (
            <div className='flex flex-col-reverse'>
              {todayMessages.map((today) => (
                <div key={today.messageId}>
                  {/* ユーザー */}
                  <UserCard
                    question={today.question}
                    createdAt={today.createdAt}
                  />
                  {/* Irukara */}
                  <AiCard answer={today.answer} createdAt={today.createdAt} />
                </div>
              ))}
            </div>
          ) : (
            <InputPrompt type={1} />
          )}
          {/* 追加のやり取り */}
          {isNext &&
            messages.map((message: Message) => (
              <div key={message.id}>
                {message.role === 'user' && (
                  <UserCard
                    question={message.content}
                    createdAt={currentUnix()}
                  />
                )}
                {message.role === 'assistant' && (
                  <div>
                    <AiCard
                      answer={message.content}
                      createdAt={currentUnix()}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div ref={scrollRef} />
      {/* 入力 */}
      <div className='w-full h-[100px] py-2 px-2 mb-8 dark:border-white/20 md:border-transparent md:dark:border-transparent'>
        <div
          className={`fixed bottom-[2.8rem] right-2 overflow-hidden ${
            isSidebar
              ? 'w-[calc(100%-16px)] md:w-[calc(100%-256px)]' // +12px
              : 'w-[calc(100%-16px)] md:w-[calc(100%-64px)]'
          }`}
        >
          <form
            onSubmit={async (e) => onSubmitFn(e)}
            className='w-full bg-white h-full gap-4 border-solid border-2 border-blue-400 rounded-md'
          >
            <textarea
              value={question}
              readOnly={isAnswer}
              onChange={textValidate}
              placeholder={questionHolder}
              className='border-none outline-none px-4 py-2 text-base resize-none'
            />
            <div className='absolute bottom-2 right-1 flex justify-end mr-2 mb-1 bg-white'>
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
    </>
  );
}
