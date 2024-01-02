import { deleteNextAuthSession } from '@/app/api/auth/[...nextauth]/adapter';
import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import GenerateArea from '@/components/client/molecules/login/GenerateArea';
import Sidebar from '@/components/client/molecules/login/Sidebar';
import { GetUserIdRes } from '@/types/auth/api';

/**
 * 他のユーザーの投稿を見れる
 * @param session
 * @returns
 */
export default async function TopMyPage() {
  // ユーザー情報を取得
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
  const getUserEndpoint = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const { data }: { data: GetUserIdRes } = await getApi(getUserEndpoint);
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
      {isUser && (
        <div className='relative z-0 flex h-full w-full overflow-hidden'>
          {/* 生成エリア */}
          {/* サイドバー spは45px pcは250px */}
          <Sidebar />
          <div className='relative flex flex-1 h-full w-full flex-col overflow-hidden'>
            <GenerateArea data={data} />
          </div>
        </div>
      )}
    </>
  );
}
