'use client';

import { useEffect, useState } from 'react';
import { PLAN } from '@/common/constants';
import Link from 'next/link';
import { LINK_PATH } from '@/common/constants/path';
import Card from '../../atoms/Card';
import SectionWrapper from '../../template/SectionWrapper';

export interface UserStatusProps {
  isUser: boolean;
  userId: string;
  lineId: string;
  providerType: string;
  mode: number;
  status: number;
  registerMethod: string;
  lastLogin: number;
  createdAt: number;
  // gpt3.5
  weekMsg: number;
  totalMsg: number;
  weekMsgSave: number;
  totalMsgSave: number;
  // image
  weekImg: number;
  totalImg: number;
  weekImgSave: number;
  totalImgSave: number;
  // 追加gpt4
  weekMsg4?: number;
  totalMsg4?: number;
  weekMsgSave4?: number;
  totalMsgSave4?: number;
}

export default function UserStatus({
  userData,
}: {
  userData: UserStatusProps;
}) {
  const [status, setStatus] = useState<string>();
  const [weekMsg, setWeekMsg] = useState<number>(0);
  const [weekImage, setWeekImage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const { status, weekMsg, weekImg, totalMsg, totalImg } = userData;
    setStatus(PLAN[status]);
    setWeekMsg(weekMsg);
    setWeekImage(weekImg);
    setTotal(totalMsg + totalImg);
  }, []);

  return (
    <>
      <SectionWrapper colorName='section-gray' styleName='section-top'>
        <div className='flex items-center mb-4'>
          <h1 className='text-lg font-semibold mr-4'>現在のプラン</h1>
          <button className='bg-line font-semibold text-white py-1 px-2 text-base rounded-md shadow-lg hover:opacity-90'>
            <Link href={LINK_PATH.MEMBER}>プランをアップグレード</Link>
          </button>
        </div>
        {/* 回数の状態 */}
        <div className='md:flex justify-center items-center'>
          <Card title='現在のプラン' text={status} />
          <Card title='今週の合計回数' text={total} />
          <Card title='今週のチャット回数' text={weekMsg} />
          <Card title='今週の画像生成回数' text={weekImage} />
        </div>
      </SectionWrapper>
    </>
  );
}
