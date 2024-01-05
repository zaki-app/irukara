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
import Sidebar from '@/components/client/molecules/login/Sidebar';
import GenerateArea from '@/components/client/molecules/login/GenerateArea';
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
            <div className='relative z-0 flex h-full w-full overflow-hidden'>
              {/* 生成エリア */}
              {/* サイドバー spは45px pcは250px */}
              <Sidebar />
              <div className='relative flex flex-1 h-full w-full flex-col overflow-hidden'>
                <GenerateArea data={data} />
              </div>
              {/* </div> */}
              <div className='fixed overflow-hidden bottom-0 right-0 w-full z-[12] h-[30px]'>
                <div className='bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
                  <span>
                    Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
