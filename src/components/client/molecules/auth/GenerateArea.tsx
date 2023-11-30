'use client';

import { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import SectionWrapper from '../../template/SectionWrapper';

export default function GenerateArea() {
  const [isChat, setChat] = useState<boolean>(true);
  const [isImage, setImage] = useState<boolean>(false);

  function tabChange(key: string) {
    console.log('key', key);
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'チャットモード',
      children: (
        <div className='mt-4'>
          <div>メッセージエリア</div>
          <textarea placeholder='Irukaraへ質問' />
        </div>
      ),
    },
    {
      key: '2',
      label: 'イラストモード',
      children: (
        <div className='mt-4'>
          <div>画像生成のゾーン</div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'リアルモード',
      children: (
        <div className='mt-4'>
          <div>リアルの画像生成モード</div>
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper colorName='section-white' styleName='section-top'>
      <Tabs
        defaultActiveKey='1'
        color='#22c55e'
        items={items}
        onChange={(e) => tabChange(e)}
      />
    </SectionWrapper>
  );
}
