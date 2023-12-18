'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { store } from '@/store';
import { setAuthUserData } from '@/store/auth/user/slice';
import ChatGpt from './chatgpt/ChatGpt';
import Plan from '../../atoms/login/Plan';
import { UserStatusProps } from './UserStatus';

export default function GenerateArea({ data }: { data: UserStatusProps }) {
  const [numTab, setTab] = useState<number>(1);

  function selectTab(type: number) {
    setTab(type);
  }

  useEffect(() => {
    // userIdとstatusをreduxへ
    store.dispatch(
      setAuthUserData({
        userId: data.userId,
        status: data.status,
      }),
    );
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'チャット(GPT3.5)',
      children: <ChatGpt />,
    },
    {
      key: '2',
      label: 'チャット(GPT4)',
      children: <ChatGpt />,
    },
    {
      key: '3',
      label: 'イラスト',
      children: <ChatGpt />,
    },
    {
      key: '4',
      label: 'リアル',
      children: <ChatGpt />,
    },
  ];

  return (
    <div className='h-full flex flex-col px-8'>
      <Plan userData={data} />
      <div className='w-full h-full'>
        <Tabs defaultActiveKey='1' items={items} />
      </div>
    </div>
  );
}
