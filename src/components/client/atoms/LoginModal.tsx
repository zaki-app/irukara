import { irukaraSmile, irukaraSmileAlt } from '@/common/config/site.config';
import Image from 'next/image';
import React from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import Link from 'next/link';
import { LINK_PATH } from '@/common/constants/path';
import LineButton from './LineButton';
import LoginButton from './LoginButton';

/**
 * ログインモーダル
 * @returns
 */
export default function LoginModal() {
  const [isModal, setModal] = React.useState(false);
  return (
    <>
      <button
        className='bg-line py-2 px-3 mr-4 rounded-lg font-bold shadow-lg hover:bg-green-600'
        type='button'
        onClick={() => setModal(true)}
      >
        ログイン
      </button>
      {isModal && (
        <>
          <div
            onClick={() => setModal(false)}
            className={`fixed inset-0 flex justify-center items-center transition-colors z-modal
              text-base_font ${
                isModal ? 'visible bg-black/10 backdrop-blur-sm' : 'invisible'
              }`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-xl shadow transition-all w-11/12 md:w-2/3 h-auto flex flex-col ${
                isModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
              }`}
            >
              {/* モーダルヘッダー */}
              <div className='flex-1 flex p-6 items-center justify-center flex-col rounded-t-lg bg-blue-50'>
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
                  <p className='text-sm text-center mt-6'>
                    <Link className='text-blue-500' href={LINK_PATH.TERMS}>
                      {LINK_PATH.TERMS_TITLE}
                    </Link>
                    と
                    <Link className='text-blue-500' href={LINK_PATH.PRIVACY}>
                      {LINK_PATH.PRIVACY_TITLE}
                    </Link>
                    のご確認をお願いします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
