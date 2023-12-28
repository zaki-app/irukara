import { deleteNextAuthSession } from '@/app/api/auth/[...nextauth]/adapter';
import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/manageCookies';
import GenerateArea from '@/components/client/molecules/login/GenerateArea';

interface UserStatusProps {
  totalImgSave: number;
  providerType: string;
  totalMsg: number;
  mode: number;
  status: number;
  createdAt: number;
  weekMsg: number;
  lastLogin: number;
  weekMsgSave: number;
  weekImg: number;
  totalMsgSave: number;
  userId: string;
  registerMethod: string;
  weekImgSave: number;
  totalImg: number;
  lineId: string;
  isUser: boolean;
}

interface Tabs {
  key: number;
  label: string;
  component?: any;
}

/**
 * 他のユーザーの投稿を見れる
 * @param session
 * @returns
 */
export default async function TopMyPage() {
  // ユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const getUserEndpoint = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data }: { data: UserStatusProps } = await getApi(getUserEndpoint);
  console.log('レスポンス', data);

  let isUser = false;
  if (data) {
    isUser = true;
  } else {
    // ユーザーデータを取得できなかった場合はサインアウト
    await deleteNextAuthSession();
  }

  return (
    <>
      {isUser ? (
        <>
          {/* チャット・画像生成エリア */}
          <div className='relative z-0 flex h-full w-full overflow-hidden'>
            {/* サイドバー */}
            <div className='w-[250px] flex-shrink-0 overflow-x-hidden bg-slate-400'>
              サイドバー
            </div>
            {/* 生成エリア */}
            <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
              <GenerateArea data={data} />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
