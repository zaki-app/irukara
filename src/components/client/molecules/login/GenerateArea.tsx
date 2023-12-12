'use client';

import { Tabs, TabsProps } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import SectionWrapper from '../../template/SectionWrapper';
import ChatGpt from './chatgpt/ChatGpt';
import IllustImage from './illust/IllustImage';
import RealImage from './real/RealImage';
import Plan from '../../atoms/login/Plan';

export default function GenerateArea() {
  function tabChange(key: string) {
    console.log('key', key);
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'チャットモード(GPT3.5)',
      children: <ChatGpt />,
    },
    {
      key: '2',
      label: 'チャットモード(GPT4) Beta',
      children: <ChatGpt />,
    },
    {
      key: '3',
      label: 'イラストモード',
      children: 'イラスト画像生成',
    },
    {
      key: '4',
      label: 'イラストモード',
      children: 'リアル画像生成',
    },
  ];

  return (
    // <SectionWrapper colorName='section-white' styleName='section-top'>
    <div className='bg-orange-200 h-full flex flex-col px-8'>
      <div className=''>
        <Plan />
      </div>
      <div className='flex-1 bg-line'>
        <Tabs items={items} className='h-full' />
      </div>
    </div>
    // </div>
    // </SectionWrapper>
  );
}
