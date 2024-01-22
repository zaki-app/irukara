'use client';

import { SELECT_MODE } from '@/common/constants';
import { imageGenerate } from '@/common/libs/api/image/imageGenerate';
import { RootState, store } from '@/store';
import { setMenuArea } from '@/store/ui/menu/slice';
import { ImageGenerateRes } from '@/types/image';
import { ChatRequestOptions } from 'ai';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { setScroll } from '@/store/ui/scroll/slice';
import { commonValidate } from '@/common/utils/varidate/input';

interface GenerateInputProps {
  question: string;
  questionHolder: string;
  isInput: boolean;
  isAnswer: boolean;
  setTaking?: Dispatch<SetStateAction<boolean>>;
  setIllustTaking?: Dispatch<SetStateAction<boolean>>;
  setRealTaking?: Dispatch<SetStateAction<boolean>>;
  setQuestion: Dispatch<SetStateAction<string>>;
  setQuestionHolder: Dispatch<SetStateAction<string>>;
  setAnswer: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  setIllustOutput: Dispatch<SetStateAction<ImageGenerateRes | undefined>>;
  setRealOutput: Dispatch<SetStateAction<ImageGenerateRes | undefined>>;
  setInput: Dispatch<SetStateAction<boolean>>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

/**
 * 4つの生成テキストエリア
 * @param param0
 * @returns
 */
export default function GenerateInput({
  question,
  questionHolder,
  isInput,
  isAnswer,
  setTaking,
  setIllustTaking,
  setRealTaking,
  setQuestion,
  setQuestionHolder,
  setAnswer,
  handleSubmit,
  setIllustOutput,
  setRealOutput,
  setInput,
  handleInputChange,
}: GenerateInputProps) {
  const { isSidebar } = useSelector((state: RootState) => state.sidebarSlice);
  const { isMenu } = useSelector((state: RootState) => state.menuSlice);
  const { selectedMenu } = useSelector(
    (state: RootState) => state.selectedMenuSlice,
  );
  const { userId, status } = useSelector(
    (state: RootState) => state.authUserDataSlice,
  );

  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  return (
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
          console.log('回答作成中です');
          if (question) {
            setQuestionHolder('回答を作成中です');
            setAnswer(false);

            if (selectedMenu === SELECT_MODE.GPT3) {
              handleSubmit(e);
              if (setTaking) setTaking(true);
            } else if (selectedMenu === SELECT_MODE.GPT4) {
              // chatGPT4
            } else if (selectedMenu === SELECT_MODE.ILLUST) {
              if (setIllustTaking) setIllustTaking(true);
              // イラスト生成
              const illustRes = await imageGenerate({
                userId,
                prompt: question,
                memberStatus: status,
                type: SELECT_MODE.ILLUST,
              });
              if (illustRes) setIllustOutput(illustRes);
            } else if (selectedMenu === SELECT_MODE.REAL) {
              if (setRealTaking) setRealTaking(true);
              // リアル画像生成
              const realRes = await imageGenerate({
                userId,
                prompt: question,
                memberStatus: status,
                type: SELECT_MODE.REAL,
              });
              if (realRes) setRealOutput(realRes);
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
  );
}
