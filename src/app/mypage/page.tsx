import { fetchMessage } from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveImageData, SaveMessageData } from '@/common/types/LineTypes';
import { Suspense } from 'react';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';
import Link from 'next/link';
import { dateFormat } from '@/common/libs/dateFromat';
import textTruncate from '@/common/libs/textTruncate';
import TabMenuContents from '@/components/client/template/TabMenuContents';
import { fetchImages } from '@/common/libs/fetchImage';
import { isAuth } from '@/common/utils/authLINE/auth';
import { redirect } from 'next/navigation';
import Redirect from '@/components/client/template/Redirect';

interface SaveMessageDataType {
  data: SaveMessageData[] | boolean;
}

interface SaveImageDataType {
  imageData: SaveImageData[] | boolean;
}

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const textChat: SaveMessageDataType = await fetchMessage();
  console.log('レスポンス', textChat);
  // イラスト画像データを取得
  // const illust: SaveImageDataType = await fetchImages(1);
  // console.log('イラスト画像', illust);
  // // リアル画像データを取得
  // const real: SaveImageDataType = await fetchImages(2);
  // console.log('リアル画像', real);

  const thName = ['質問', '回答', '作成日'];

  // ログイン状態ではなかったらリダイレクト
  const isAuthState = await isAuth();

  return (
    <>
      {isAuthState ? (
        <ContentsWrapper>
          <div>
            <h2>{}</h2>
          </div>
          <div>ログイン済みなので表示できる</div>
        </ContentsWrapper>
      ) : (
        <Redirect path='/' />
      )}
    </>
  );
}
