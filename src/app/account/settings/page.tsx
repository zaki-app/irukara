import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { dateFormat } from '@/common/libs/dateFormat';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import UserProfileCard from '@/components/client/atoms/ui/card/UserProfileCard';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import { GetUserIdRes } from '@/types/auth/api';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default async function AccountSettings() {
  // 最新のユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const path = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data }: { data: GetUserIdRes } = await getApi(path);

  console.log('最新のゆーざー', data);

  interface User {
    column: string;
    userData: string;
  }

  const columns: ColumnsType<User> = [
    {
      key: 'column',
      title: '',
      dataIndex: 'column',
      // rowScope: 'row',
    },
    {
      key: 'userData',
      title: '',
      dataIndex: 'userData',
    },
  ];

  const profileData: User[] = [
    {
      column: '今週のチャット',
      userData: `${data.weekMsg} 件`,
    },
    {
      column: '今週の画像生成',
      userData: `${data.weekImg} 件`,
    },
    {
      column: '合計チャット数',
      userData: `${data.totalMsg} 件`,
    },
    {
      column: '合計画像生成数',
      userData: `${data.totalImg} 件`,
    },
    {
      column: '登録日',
      userData: `${dateFormat(data.createdAt)}`,
    },
  ];

  return (
    <PrimaryWrapper type={1}>
      <div className='w-[90%] md:[80%] h-full m-auto overflow-hidden mt-[1.1rem]'>
        <h1 className='font-semibold text-2xl mb-6'>アカウント情報</h1>
        <div className='h-[130px]'>
          <UserProfileCard />
        </div>
        {/* テーブル */}
        <div className='mt-6'>
          <Table<User>
            columns={columns}
            dataSource={profileData}
            pagination={false}
            showHeader={false}
          />
        </div>
      </div>
    </PrimaryWrapper>
  );
}
