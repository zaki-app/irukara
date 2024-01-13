'use client';

import { irukaraSmile, irukaraSmileAlt } from '@/common/config/site.config';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { LINK_PATH } from '@/common/constants/path';
import { createPortal } from 'react-dom';
import LineButton from '../../atoms/ui/button/LineButton';
import LoginButton from '../../atoms/ui/button/LoginButton';

/**
 * ログインモーダル
 * @returns
 */
export default function LoginModal({
  isModal,
  closeModal,
}: {
  isModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isAnimation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    // スクロールバーをstableにする
    if (isModal) {
      document.documentElement.style.scrollbarGutter = 'stable';
    } else {
      document.documentElement.style.scrollbarGutter = 'auto';
    }

    // アニメーション用
    setTimeout(() => {
      setAnimation(true);
    }, 0.3);
  }, [isModal]);

  function modalToggle() {
    closeModal(false);
    setAnimation(false);
  }

  return createPortal(
    <>
      {/* 背景をスクロールしないように固定 */}
      <style>{'body {overflow: hidden}'}</style>
      <div
        draggable={false}
        className={`fixed inset-0 flex justify-center items-center z-modal z-[11]
                  text-base_font transition-all w-full h-screen overflow-auto
                  ${
                    isAnimation
                      ? 'visible bg-black/10 backdrop-blur-sm ease-linear'
                      : 'invisible'
                  }
                  `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow transition-all w-11/12 md:w-2/3 h-100dvh flex flex-col ${
            isAnimation
              ? 'scale-100 opacity-100 ease-linear'
              : 'scale-125 opacity-0 ease-linear'
          }`}
        >
          {/* モーダルヘッダー */}
          <div className='flex-1 flex p-6 items-center justify-center flex-col rounded-t-lg bg-blue-50'>
            <FaTimes
              className='absolute right-0 top-0 bg-blue-500 m-4 text-3xl text-white 
              rounded-full p-1 font-bold cursor-pointer hover:translate-y-1
              transition-all'
              onClick={() => modalToggle()}
            />
            <div className='mr-4'>
              <Image
                src={irukaraSmile}
                alt={irukaraSmileAlt}
                width={70}
                height={70}
              />
            </div>
            <div className='text-center'>
              <h2 className='text-xl font-bold mb-3'>Irukaraへログイン</h2>
              <p className='text-xs'>
                LINEログイン・Googleログインに対応しています
              </p>
            </div>
          </div>
          {/* モーダルボディ */}
          <div className='flex-1 flex flex-col justify-center px-6 py-8'>
            <p className='text-sm'>
              LINEでお友達登録されている方は、Irukara.netでLINEの履歴を確認することができるのでおすすめです！
            </p>
            <div className='w-full md:w-9/12 mx-auto scale-100 md:scale-90 mt-4 mb-8 md:mb-6'>
              <LoginButton
                type='line'
                className='py-2'
                size={30}
                textClass='ml-2 text-base font-bold'
              />
            </div>
            <div className='w-full md:w-9/12 mx-auto scale-100 md:scale-90'>
              <LoginButton
                type='google'
                className='py-2'
                size={20}
                textClass='ml-2 text-base font-bold'
              />
            </div>
          </div>
          {/* 友達追加 */}
          <div className='flex-1 p-6 bg-blue-50 rounded-b-lg'>
            <div className='flex justify-center items-center mb-4'>
              <FaArrowAltCircleDown className='animate-bounce text-blue-500 text-2xl mr-2' />
              <p className='text-sm'>お友達登録がまだの方は</p>
            </div>
            <div className='w-full md:w-9/12 mx-auto scale-100 md:scale-90'>
              <LineButton type={0} className='' size={40} textClass='' />
            </div>
            <div className='mt-4'>
              <div className='text-sm text-center mt-6 flex'>
                <Link
                  className='text-blue-500'
                  href={LINK_PATH.TERMS}
                  onClick={() => modalToggle()}
                >
                  {LINK_PATH.TERMS_TITLE}
                </Link>
                と
                <Link
                  className='text-blue-500'
                  href={LINK_PATH.PRIVACY}
                  onClick={() => modalToggle()}
                >
                  {LINK_PATH.PRIVACY_TITLE}
                </Link>
                のご確認をお願いします。
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('login-modal') as HTMLElement,
  );
}
