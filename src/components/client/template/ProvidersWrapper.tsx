'use client';

import { Header, Footer } from '@/components/client/organisms';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import type { Liff } from '@line/liff/exports';
import { useRouter, notFound } from 'next/navigation';
import {
  setCookie,
  isCookie,
  getCookie,
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

        // irukaraのcookieなし
        // (初回ログイン時)はトークン有効性検証、有効ならcookieに保存する
        try {
          if (!(await isCookie())) {
            console.log('クライアント　クッキーなし');
            const token = liff.getAccessToken();
            const isToken = await isVerifyToken(token ?? '');
            if (token && isToken) {
              setCookie('irukara', token ?? '');
              router.push('/');
              setIsLogin(true);
              console.log('Welcome to Irukara👍');
            } else if (!isToken) {
              liff.login();
            }
          } else {
            // irukaraのcookieあり
            // 有効性を検証しfalseの場合ログイン画面へ遷移
            console.log('クライアント クッキーあり');
            const existingCookie = await getCookie('irukara');
            const isExistingCookie = await isVerifyToken(existingCookie ?? '');
            setIsLogin(true);
            if (!isExistingCookie) liff.login();
          }

          // 有効性が確認できたらプロフィールを取得
          const profile = await getProfile();
          if (profile) {
            store.dispatch(setUserProfile(profile));
          }

          setLiffObject(liff);
          console.log('ログイン', isLogin);
        } catch (err) {
          console.error('liffでのエラーなのでエラー画面に飛ばしたい', err);
          // notFound();
        }
      })
      .catch((err) => {
        console.error('liff init error, これもエラー画面に飛ばしたい', err);
        notFound();
      });
  }

  useEffect(() => {
    liffInit();
  }, []);

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
