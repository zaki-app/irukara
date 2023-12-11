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

  return (
    // <SectionWrapper colorName='section-white' styleName='section-top'>
    <div className='bg-slate-200'>
      <Plan />
      <Tabs defaultActiveKey='1' onChange={(e) => tabChange(e)}>
        <TabPane tab='チャットモード(GPT3.5)' key={1}>
          <ChatGpt />
        </TabPane>
        <TabPane tab='チャットモード(GPT4)Beta' key={2}>
          <ChatGpt />
        </TabPane>
        <TabPane tab='イラストモード' key={3}>
          <IllustImage />
        </TabPane>
        <TabPane tab='リアルモード' key={4}>
          <RealImage />
        </TabPane>
      </Tabs>
    </div>
    // </SectionWrapper>
  );
}
