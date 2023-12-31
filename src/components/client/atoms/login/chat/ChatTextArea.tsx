'use client';

import { RootState } from '@/store';
import { ChangeEvent, FormEvent } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface ChatTextAreaProps {
  isInput: boolean;
  question: string;
  textValidate: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isAnswer: boolean;
  questionHolder: string;
  onSubmitFn: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * 生成テキストエリア
 */
export default function ChatTextArea({
  isInput,
  question,
  textValidate,
  isAnswer,
  questionHolder,
  onSubmitFn,
}: ChatTextAreaProps) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);

  return (
    <div className='w-full h-[90px] bg-red-300 py-2 px-2 mb-8 dark:border-white/20 md:border-transparent md:dark:border-transparent'>
      <div
        className={`fixed right-2 overflow-hidden ${
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
            className='border-none outline-none px-4 py-2 w-full text-base resize-none'
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
  );
}
