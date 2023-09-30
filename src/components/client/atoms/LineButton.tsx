'use client';

import { lineLogo } from '@/common/config/site.config';
import Image from 'next/image';

interface LineButtonProps {
  type: number;
  className: string;
  size: number;
  textClass: string;
}

export default function LineButton({
  type,
  className,
  size,
  textClass,
}: LineButtonProps) {
  const LINEME = process.env.NEXT_PUBLIC_LINE_ME ?? '';
  const baseCss =
    'bg-line flex text-white items-center justify-center rounded-lg py-2 px-8 hover:opacity-90';
  const baseText = 'font-bold text-xl pl-4';

  return (
    <>
      {/* 友達追加 */}
      {type === 0 && (
        <a
          href={LINEME}
          target='_blank'
          rel='noreferrer'
          className={`
            bg-line flex text-white items-center justify-center 
            rounded-lg hover:opacity-90 font-bold ${className}`}
        >
          <Image
            src={lineLogo}
            alt='IrukaraのLINE友だち追加です'
            width={size}
            height={size}
          />
          <div className={textClass}>友だち追加</div>
        </a>
      )}
      {/* 友達追加 通常ボタン */}
      {type === 1 && (
        <a href={LINEME} target='_blank' rel='noreferrer' className={baseCss}>
          <Image
            src={lineLogo}
            alt='IrukaraのLINE友だち追加です'
            width={40}
            height={40}
          />
          <div className={baseText}>お友だち追加</div>
        </a>
      )}
      {/* ログイン */}
      {type === 2 && (
        <div className={baseCss}>
          <Image
            src={lineLogo}
            alt='IrukaraのLINEログインです'
            width={40}
            height={40}
          />
          <div className={baseText}>LINEログイン</div>
        </div>
      )}
    </>
  );
}
