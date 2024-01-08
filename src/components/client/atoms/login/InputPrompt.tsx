'use client';

import { SITE_CONFIG, irukaraSmileAlt } from '@/common/config/site.config';
import { RootState } from '@/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

/**
 * 入力前に表示するメッセージコンポーネント
 * TODO chatgpt, 画像生成で分けたい
 * @param {type: number} 1...GPT3.5, 2...GPT4, 3...イラスト生成 4...リアル生成
 */
export default function InputPrompt({ type }: { type: number }) {
  const { name } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  return (
    <div className='relative w-full h-full flex justify-center flex-col items-center overflow-hidden'>
      <div className='text-base_font text-center font-semibold'>
        <h2 className='text-xl'>
          Irukaraは{name ? `${name}さん` : 'あなた'}だけの
          <br />
          AIアシスタントです！
        </h2>
        <div className='flex justify-center'>
          <Image
            src={SITE_CONFIG.ICON}
            alt={irukaraSmileAlt}
            width={100}
            height={100}
            className='my-12'
          />
        </div>
        <div className='text-base'>
          {type === 1 && (
            <p>
              ここはチャットでIrukaraに質問できるページです。
              <br />
              どんなことをお手伝いできますか？
            </p>
          )}
          {type === 3 && (
            <p>
              ここはイラスト画像を生成できるページです
              <br />
              どのようなイラスト生成したいですか？
            </p>
          )}
          <p className='mt-4'>
            下のメニューから選んでください！
            <br />
            メニューの表示切り替えは左下の三角ボタンを押してください。
          </p>
        </div>
      </div>
    </div>
  );
}
