'use client';

import { Tabs, TabsProps } from 'antd';
import SectionWrapper from '../../template/SectionWrapper';
import ChatGpt from './chatgpt/ChatGpt';
import IllustImage from './illust/IllustImage';
import RealImage from './real/RealImage';

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
      label: 'チャットモード(GPT4)Beta',
      children: <ChatGpt />,
    },
    {
      key: '3',
      label: 'イラストモード',
      children: <IllustImage />,
    },
    {
      key: '4',
      label: 'リアルモード',
      children: <RealImage />,
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
