'use client';

import { Header, Footer } from '@/components/client/organisms';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import type { Liff } from '@line/liff/exports';
import { useRouter } from 'next/navigation';
import {
  setCookie,
  isCookie,
  getAccessToken,
  getUserId,
} from '@/common/utils/authLINE/manageCookies';
import isVerifyToken from '@/common/utils/authLINE/isVerifyToken';
import getProfile from '@/common/utils/authLINE/getProfile';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setUserProfile } from '@/store/line-profile/slice';

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [liffObject, setLiffObject] = useState<Liff | null>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  async function liffInit() {
    // TODO アクセスがwebの時は自動ログインしないようにしたい
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID ?? '';

    liff.init({ liffId });
    // 初期化できたか判定する
    liff.ready
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        // irukaraのcookieがない時(初回ログイン時)はトークン有効性検証、有効ならcookieに保存する
        try {
          if (!(await isCookie())) {
            const token = liff.getAccessToken();
            const isToken = await isVerifyToken(token ?? '');
            if (token && isToken) {
              setCookie('irukara', token ?? '');
              router.push('/');
              console.log('Welcome to Irukara👍');
            }
          }

          /* irukaraのcookieがあり、かつログイン状態の場合プロフィールを取得する */
          if ((await isCookie()) && isLogin) {
            const profile = await getProfile();
            store.dispatch(setUserProfile(profile));
          }

          setLiffObject(liff);
          setIsLogin(true);
          console.log('ログイン', isLogin);
        } catch (err) {
          console.error('liffでのエラーなのでエラー画面に飛ばしたい', err);
        }
      })
      .catch((err) => {
        console.error('liff init error, これもエラー画面に飛ばしたい', err);
      });
  }

  useEffect(() => {
    liffInit();
  }, [isLogin]);

  return (
    <html lang='ja'>
      <body>
        {isLogin ? (
          <Provider store={store}>
            <Header liff={liffObject} />
            {children}
            <Footer />
          </Provider>
        ) : (
          <div>loading...</div>
        )}
      </body>
    </html>
  );
}
