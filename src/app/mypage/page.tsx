import { fetchMessage } from '@/common/libs/fetchMessage';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';
import TabMenuContents from '@/components/client/template/TabMenuContents';
import { fetchImages } from '@/common/libs/fetchImage';
import { isAuth } from '@/common/utils/authLINE/auth';
import Redirect from '@/components/client/template/Redirect';

import type {
  SaveMessageDataType,
  SaveImageDataType,
} from '@/common/types/fetchData';

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const textChat: SaveMessageDataType = await fetchMessage();
  // const textChat = {
  //   count: 0,
  //   data: false,
  // };

  // イラスト画像データを取得
  const illust: SaveImageDataType = await fetchImages(1);
  console.log('イラスト画像', illust);
  // リアル画像データを取得
  const real: SaveImageDataType = await fetchImages(2);
  console.log('リアル画像', real);

  // ログイン状態ではなかったらリダイレクト
  const isAuthState = await isAuth();
  console.log('マイページ', isAuthState);

  return (
    <>
      {isAuthState ? (
        <ContentsWrapper>
          <TabMenuContents
            textChat={textChat}
            illustImage={illust}
            realImage={real}
          />
        </ContentsWrapper>
      ) : (
        <Redirect path='/' />
      )}
    </>
  );
}
