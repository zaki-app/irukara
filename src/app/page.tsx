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
import {
  COOKIE_NAME,
  IMAGE_TYPE,
  SELECTED_MENU,
  SELECT_MODE,
} from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { GetUserIdRes } from '@/types/auth/api';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import GenerateArea from '@/components/client/molecules/login/GenerateArea';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import { startEndUnix } from '@/common/libs/dateFormat';
import { MessageType } from '@/types/message';
import { ImageTableRes } from '@/types/image';
import { options } from './api/auth/[...nextauth]/options';
import { deleteNextAuthSession } from './api/auth/[...nextauth]/adapter';

export default async function Home() {
  const session = (await getServerSession(options)) as SessionUserInfo;

  // ユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const selectedMode = (await getCookie(COOKIE_NAME.SELECTED_MENU)) ?? '0';

  let userData;
  let todayData;
  if (userId) {
    const getUserEndpoint = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
    const { data }: { data: GetUserIdRes } = await getApi(getUserEndpoint);
    userData = data;
    // メニューごとに今日のデータを取得
    const selectedMenu = (await getCookie(COOKIE_NAME.SELECTED_MENU)) ?? '0';
    const { start, end } = startEndUnix(0);
    let path;

    if (Number(selectedMenu) === SELECT_MODE.GPT3) {
      // chatgpt3.5
      path = IRUKARA_API.GET_MSG_DATE.replace('{userId}', userId)
        .replace('{startUnix}', start.toString())
        .replace('{endUnix}', end.toString());
      console.log('パス', path);
      const { data }: { data: MessageType[] } = await getApi(path);
      console.log('データが入ってない？', data);
      todayData = data;
    } else if (Number(selectedMenu) === SELECT_MODE.GPT4) {
      // chatgpt4.0
      todayData = [];
    } else if (Number(selectedMenu) === SELECT_MODE.ILLUST) {
      // イラスト生成
      path = IRUKARA_API.GET_IMAGES.replace('{userId}', userId)
        .replace('{startUnix}', start.toString())
        .replace('{endUnix}', end.toString())
        .replace('{imageType}', IMAGE_TYPE.ILLUST.toString());
      const { data }: { data: ImageTableRes } = await getApi(path);
      todayData = data;
    } else if (Number(selectedMenu) === SELECT_MODE.REAL) {
      // リアル画像生成
      path = IRUKARA_API.GET_IMAGES.replace('{userId}', userId)
        .replace('{startUnix}', start.toString())
        .replace('{endUnix}', end.toString())
        .replace('{imageType}', IMAGE_TYPE.REAL.toString());
      const { data }: { data: ImageTableRes } = await getApi(path);
      todayData = data;
    }
  }

  let isUser = false;
  if (userData) {
    isUser = true;
  } else {
    isUser = false;
    // ユーザーデータを取得できなかった場合はサインアウト
    await deleteNextAuthSession();
  }

  return (
    <>
      {!session || !userData ? (
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
              <GenerateArea
                userData={userData}
                todayData={todayData as MessageType[]}
                type={1}
                selectedMode={Number(selectedMode)}
              />
            </PrimaryWrapper>
          )}
        </>
      )}
    </>
  );
}
