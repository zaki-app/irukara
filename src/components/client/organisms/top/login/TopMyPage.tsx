import { deleteNextAuthSession } from '@/app/api/auth/[...nextauth]/adapter';
import { COOKIE_NAME } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/manageCookies';
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
      {isUser ? (
        <div className='flex flex-col h-full overflow-hidden'>
          {/* チャット・画像生成エリア */}
          <div className='relative z-0 flex h-full w-full overflow-hidden'>
            {/* サイドバー spは45px pcは250px */}
            <Sidebar />
            {/* 生成エリア */}
            <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
              <GenerateArea data={data} />
            </div>
            {/* 注意文 */}
          </div>
          <div className='fixed overflow-hidden bottom-0 w-full left-0 bg-blue-500 text-white text-[0.5rem] md:text-[0.8rem] flex justify-center py-2 px-4 font-semibold tracking-[.1rem]'>
            <span>
              Irukaraはまだまだ勉強中です。重要な情報に関してはご注意ください。
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
