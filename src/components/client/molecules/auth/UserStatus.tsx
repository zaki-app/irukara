'use client';

import { GetUserIdRes } from '@/types/auth/api';
import { useEffect, useState } from 'react';
import { PLAN } from '@/common/constants';
import Card from '../../atoms/Card';
import SectionWrapper from '../../template/SectionWrapper';

interface UserStatusProps {
  userData: GetUserIdRes | boolean;
}

export default function UserStatus() {
  // console.log('userstatus', userData);
  const [plan, setPlan] = useState<string>('');
  const [weekMsg, setWeekMsg] = useState<number>(0);
  const [weekImage, setWeekImage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // if (typeof userData !== 'boolean') {
    //   setPlan(PLAN[userData.status]);
    //   setWeekMsg(userData.weekMsg);
    //   setWeekImage(userData.weekImg);
    //   setTotal(userData.weekMsg + userData.weekImg);
    // }
  }, []);

  return (
    <SectionWrapper colorName='section-gray' styleName='section-top'>
      <div className='flex items-center mb-4'>
        <h1 className='text-lg font-semibold mr-4'>現在のプラン</h1>
        <button className='bg-line font-semibold text-white py-1 px-2 text-base rounded-md shadow-lg hover:opacity-90'>
          プランをアップグレード
        </button>
      </div>
      {/* 回数の状態 */}
      <div className='md:flex justify-center items-center'>
        <Card title='現在のプラン' text={plan} />
        <Card title='今週の合計回数' text={total} />
        <Card title='今週のチャット回数' text={weekMsg} />
        <Card title='今週の画像生成回数' text={weekImage} />
      </div>
    </SectionWrapper>
  );
}
