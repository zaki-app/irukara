import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import UserProfileCard from '@/components/client/atoms/ui/card/UserProfileCard';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import { Table } from 'antd';

export default async function AccountSettings() {
  // 最新のユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const path = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data } = await getApi(path);

  console.log('最新のゆーざー', data);

  const columns = [
    {
      title: ' ',
      dataIndex: 'columns',
      key: 'columns',
    },
    {
      title: '登録情報',
      dataIndex: 'userData',
      key: 'usereData',
    },
  ];

  return (
    <PrimaryWrapper type={1}>
      <div className='w-[90%] md:[80%] h-full m-auto bg-gray-200 overflow-hidden'>
        <h1 className='font-semibold text-2xl mb-6'>アカウント情報</h1>
        <UserProfileCard />
        {/* テーブル */}
        <div className='mt-6'>
          <Table columns={columns} />
        </div>
      </div>
    </PrimaryWrapper>
  );
}
