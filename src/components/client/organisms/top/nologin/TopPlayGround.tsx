import React from 'react';
import SectionWrapper from '@/components/client/template/SectionWrapper';
import Image from 'next/image';
import { irukamoBasic, irukamoBasicAlt } from '@/common/config/site.config';
import ChatArea from '@/components/client/molecules/openai/ChatArea';

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
        <ChatArea />
      </div>
    </SectionWrapper>
  );
}
