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
  console.log('タイプ', type);
  const { name } = useSelector(
    (state: RootState) => state.authUserProfileSlice,
  );

  return (
    <div className='flex-1 w-full h-full flex justify-center flex-col items-center py-12'>
      <h2 className='text-xl font-semibold'>
        Irukaraは{name ? `${name}さん` : 'あなた'}だけの
        <br />
        AIアシスタントです！
      </h2>
      <Image
        src={SITE_CONFIG.ICON}
        alt={irukaraSmileAlt}
        width={100}
        height={100}
        className='my-12'
      />
      <div className='text-lg font-semibold'>
        {type === 1 && <p>どんなことをお手伝いできますか？</p>}
      </div>
    </div>
  );
}
