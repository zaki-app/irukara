'use client';

import { lineLogo } from '@/common/config/site.config';
import Image from 'next/image';

interface LineButtonProps {
  type: number;
}

export default function LineButton({ type }: LineButtonProps) {
  const LINEME = process.env.NEXT_PUBLIC_LINE_ME ?? '';
  const baseCss =
    'bg-line flex text-white items-center justify-center rounded-lg py-2 px-8 hover:opacity-90';
  const miniCss =
    'bg-line text-xl md:text-base flex text-white items-center justify-center rounded-lg hover:opacity-90 font-semibold px-14 md:px-4 py-2 md:py-0';
  const baseText = 'font-bold text-xl pl-4';

  return (
    <div>
      {/* 友達追加 ミニボタン */}
      {type === 0 && (
        <a href={LINEME} target='_blank' rel='noreferrer' className={miniCss}>
          <Image
            src={lineLogo}
            alt='IrukaraのLINE友だち追加です'
            width={40}
            height={40}
          />
          <div>友だち追加</div>
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
      {type === 3 && (
        <div className={miniCss}>
          <Image
            src={lineLogo}
            alt='IrukaraのLINEログインです'
            width={40}
            height={40}
          />
          <div>LINEログイン</div>
        </div>
      )}
    </div>
  );
}
