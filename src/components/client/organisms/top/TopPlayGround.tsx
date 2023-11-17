import React from 'react';
import SectionWrapper from '@/components/client/template/SectionWrapper';
import Image from 'next/image';
import { irukamoBasic, irukamoBasicAlt } from '@/common/config/site.config';
import { InButton } from '../../atoms';

export default function TopPlayGround() {
  return (
    <SectionWrapper colorName='section-white' styleName='section-top'>
      <div className='py-8'>
        <div>
          <div className='flex items-center'>
            <Image
              src={irukamoBasic}
              alt={irukamoBasicAlt}
              width={40}
              height={40}
            />
            <h3 className='text-3xl font-semibold ml-4'>遊んでみる</h3>
          </div>
          <p className='text-sm my-4'>※画像生成はログイン後に使用できます</p>
        </div>
        <textarea
          className='mt-2 bg-slate-200 p-2 w-full'
          placeholder='1回だけ無料でお試しできます。'
        />
        <div>
          <InButton
            buttonStyle='max-w-[120px] mt-4 px-2 py-2 bg-gradient-to-r from-blue-600 to-sky-500 text-base'
            text='送信'
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
