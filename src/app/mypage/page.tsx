import { fetchMessage } from '@/common/libs/fetchMessage';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';
import TabMenuContents from '@/components/client/template/TabMenuContents';
import Redirect from '@/components/client/template/Redirect';

import type { SaveMessageDataType } from '@/types/fetchData';
import { redirect } from 'next/navigation';
import { CALLBACK } from '@/common/constants/path';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UserProfile from '@/components/client/organisms/mypage/UserProfile';

export default async function MyPage() {
  return (
    <>
      <div>マイページです</div>
    </>
  );
}

// export default async function MyPage() {
//   // 未ログインはホームにリダイレクト
//   const session = await getServerSession();
//   console.log('mypage session', session);
//   if (!session) redirect(CALLBACK.SIGNIN_URL);

//   // ログインしているユーザーの保存メッセージを取得
//   const textChat: SaveMessageDataType = await fetchMessage();
//   // const textChat = {
//   //   count: 0,
//   //   data: false,
//   // };

//   // ログイン状態ではなかったらリダイレクト
//   const isAuthState = await isAuth();
//   console.log('マイページ', isAuthState);

//   return (
//     <>
//       {isAuthState ? (
//         <ContentsWrapper>
//           <TabMenuContents textChat={textChat} />
//         </ContentsWrapper>
//       ) : (
//         <Redirect path='/' />
//       )}
//     </>
//   );
// }
