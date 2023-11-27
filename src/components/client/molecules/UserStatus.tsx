'use client';

import Card from '../atoms/Card';
import SectionWrapper from '../template/SectionWrapper';

export default function UserStatus() {
  return (
    <SectionWrapper colorName='section-gray' styleName='section-top'>
      <div className='flex items-center mb-4'>
        <h1 className='text-lg font-semibold mr-4'>現在のプラン</h1>
        <button className='bg-line text-white py-1 px-2 text-base rounded-md shadow-lg hover:opacity-90'>
          プランをアップグレード
        </button>
      </div>
      {/* 回数の状態 */}
      <div className='md:flex justify-center items-center'>
        <Card title='現在のプラン' text='無料プラン' />
        <Card title='今日の合計回数' text='12' />
        <Card title='今日のチャット回数' text='12' />
        <Card title='今日の画像生成回数' text='12' />
      </div>
    </SectionWrapper>
  );
}
