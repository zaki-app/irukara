import React from 'react';
import {
  TopService,
  TopServiceDescription,
  TopUsedService,
  TopServicePaid,
  TopLastMessage,
} from '@/components/client/organisms';
import TopPlayGround from '@/components/client/organisms/top/nologin/TopPlayGround';
import { getServerSession } from 'next-auth';
import { SessionUserInfo } from '@/types/auth';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { GetUserIdRes } from '@/types/auth/api';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import GenerateArea from '@/components/client/molecules/login/GenerateArea';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import { options } from './api/auth/[...nextauth]/options';
import { deleteNextAuthSession } from './api/auth/[...nextauth]/adapter';

export default async function Home() {
  const session = (await getServerSession(options)) as SessionUserInfo;

  // ユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const getUserEndpoint = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data }: { data: GetUserIdRes } = await getApi(getUserEndpoint);

  let isUser = false;
  if (data) {
    isUser = true;
  } else {
    // ユーザーデータを取得できなかった場合はサインアウト
    await deleteNextAuthSession();
  }

  return (
    <>
      {!session ? (
        <>
          <TopService />
          <TopPlayGround />
          <TopServiceDescription />
          <TopUsedService />
          <TopServicePaid />
          <TopLastMessage />
        </>
      ) : (
        <>
          {isUser && (
            <PrimaryWrapper type={2}>
              <GenerateArea userData={data} type={1} />
            </PrimaryWrapper>
          )}
        </>
      )}
    </>
  );
}
