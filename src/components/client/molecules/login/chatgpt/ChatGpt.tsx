'use client';

import { irukaraBasic, irukaraBasicAlt } from '@/common/config/site.config';
import { API } from '@/common/constants/path';
import { commonValidate } from '@/common/utils/varidate/input';
import { RootState } from '@/store';
import { useChat, Message } from 'ai/react';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function ChatGpt() {
  const { messages, handleInputChange, handleSubmit } = useChat({
    api: API.TOP_GPT,
  });
  const { image } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  const [inputMsg, setInputMsg] = useState<string>('');
  const [isValidate, setValidate] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isNext, setNext] = useState<boolean>(false);

  async function onSubmitFn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputMsg) {
      setInputMsg('');
      handleSubmit(e);
    }
  }

  function textValidate(e: ChangeEvent<HTMLTextAreaElement>) {
    const validate = commonValidate(e.target.value, 250);
    if (e.target.value.length > 250) {
      setInputMsg(e.target.value.slice(0, 250));
    } else {
      setInputMsg(e.target.value);
    }
    setValidate(validate.result);
    if (validate.text.length > 0) {
      setErrorMsg(validate.text);
    }
    if (!validate.result) {
      handleInputChange(e);
    }
  }

  return (
    <div className='w-full bg-slate-100 overflow-y-auto'>
      {messages.map((message: Message) => (
        <div key={message.id} className=''>
          {/* ユーザーの質問 */}
          {message.role === 'user' && (
            <div
              key={message.id}
              className='flex justify-start items-start mb-3'
            >
              <Image src={image} alt='ユーザーロゴ' width={30} height={30} />
              <p className='ml-4'>{message.content}</p>
            </div>
          )}
          {/* GPTからの回答 */}
          {message.role === 'assistant' && (
            <div className='mb-3'>
              <div className='flex justify-start items-start mb-3'>
                <Image
                  src={irukaraBasic}
                  alt={irukaraBasicAlt}
                  width={30}
                  height={30}
                />
                <p className='ml-4'>{message.content}</p>
              </div>
              <div className='flex justify-end'>
                <button className='bg-blue-500 text-white py-1 px-2 rounded-md mr-3'>
                  保存
                </button>
                <button className='bg-line text-white py-1 px-2 rounded-md'>
                  共有
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* テキストエリア・ボタン */}
      <div className='fixed bottom-6 left-0 w-full px-8'>
        <form
          onSubmit={async (e) => onSubmitFn(e)}
          className='w-full gap-4 border-solid border-2 border-blue-400 rounded-md'
        >
          <textarea
            value={inputMsg}
            onChange={textValidate}
            placeholder='Irukaraへの質問を書いてください'
            className='w-full border-none outline-none px-4 py-2 text-base resize-none'
          />
          <div className='flex justify-end mr-2 mb-1 bg-white'>
            <button className='bg-blue-500 text-white text-xl p-1 rounded-full'>
              <FaAngleDoubleRight className='text-right' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
