import { COOKIE_NAME, DEFAULT_USER, EDIT_PROFILE } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { dateFormat } from '@/common/libs/dateFormat';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import EditProfileRecord from '@/components/client/atoms/input/EditProfileRecord';
import UserProfileCard from '@/components/client/atoms/ui/card/UserProfileCard';
import UploadImage from '@/components/client/atoms/ui/upload/UploadImage';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import type { AuthUserDataType } from '@/types/auth';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import React, { ReactNode } from 'react';

export default async function AccountSettings() {
  // 最新のユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const path = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data }: { data: AuthUserDataType } = await getApi(path);

  interface User {
    column: string;
    userData: string | ReactNode;
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
      column: '共有時のお名前',
      userData: (
        <EditProfileRecord
          type={EDIT_PROFILE.NAME}
          showName={data.name ? data.name : DEFAULT_USER.NAME}
        />
      ),
    },
    {
      column: '共有時のユーザー画像',
      userData: (
        <UploadImage
          srcPath={data.pictureUrl ? data.pictureUrl : DEFAULT_USER.PICTURE}
          altText={
            data.pictureUrl ? `${data.name}さんの画像` : DEFAULT_USER.ALT
          }
        />
      ),
    },
    {
      column: 'メールアドレス',
      userData: (
        <EditProfileRecord
          type={EDIT_PROFILE.EMAIL}
          showName={data.email ? data.email : DEFAULT_USER.EMAIL}
        />
      ),
    },
    {
      column: '今週のチャット生成',
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
      userData: `${dateFormat(data.createdAt as number)}`,
    },
  ];

  // const s3ApiPath = IRUKARA_API.GET_S3_OBJECT.replace('{key}', 'ikura.jpeg');
  // console.log('パス', s3ApiPath);
  // const { imageData } = await getApi(s3ApiPath);
  // console.log('画像の型', typeof imageData);
  // const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
  // console.log('blobはどうなってる？', blob);
  // const dataUri = URL.createObjectURL(blob);

  // console.log('データURI', dataUri);

  return (
    <PrimaryWrapper type={1}>
      <div className='w-[90%] md:[80%] h-screen m-auto overflow-hidden mt-[1.5rem]'>
        <h1 className='font-semibold text-2xl mb-6'>アカウント情報</h1>
        <div className='h-[130px]'>
          <UserProfileCard />
        </div>
        <Image
          src='https://dev-irukara-profile-image.s3.ap-northeast-1.amazonaws.com/ikura.jpeg'
          alt='s3画像'
          width={100}
          height={100}
        />
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
