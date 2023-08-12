'use client';

import { Header, Footer } from '@/components/client/organisms';
import liff from '@line/liff';
import { Suspense, useEffect, useState } from 'react';
import type { Liff } from '@line/liff/exports';
import { useRouter, notFound } from 'next/navigation';
import { setCookie, getCookie } from '@/common/utils/authLINE/manageCookies';
import isVerifyToken from '@/common/utils/authLINE/isVerifyToken';
import getProfile from '@/common/utils/authLINE/getProfile';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setUserProfile } from '@/store/line-profile/slice';
import logColor from '@/common/config/logColor';

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [liffObject, setLiffObject] = useState<Liff | null>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();

  async function liffInit() {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID ?? '';
    const { userAgent } = window.navigator;
    const searchUserAgent = 'LIFF';

    // 外部ブラウザで最初にログイン画面に自動的に飛ばさないようにする
    liff.init({ liffId, withLoginOnExternalBrowser: false });
    liff.ready
      .then(async () => {
        // 初回アクセス(LIFFブラウザか外部かで分岐)
        if (!userAgent.includes(searchUserAgent)) {
          // 外部ブラウザの場合
          setCookie('browser', 'external');
          setIsLoaded(true);
        } else {
          // LIFFの場合
          if (!liff.isLoggedIn()) {
            liff.login();
          }
          setCookie('browser', 'LIFF');
        }

        console.log('ブラウザ判断終了後');

        // browser登録後(tokenのcookieがない場合 アクセストークンを取得して有効性を確認)
        if (!(await getCookie('irukaraAT'))) {
          console.log('クライアントクッキーなし not Login');
          const token = liff.getAccessToken();
          const isToken = await isVerifyToken(token ?? '');
          if (token && isToken) {
            setCookie('irukaraAT', token ?? '');
            // setIsLoaded(true);
            router.push('/');
            console.log('Welcome to Irukara👍');
          }
        }

        // irukaraのcookieあり すでにログイン済みの状態。
        // アクセストークンがある場合プロフィールを取得する
        try {
          console.log('クライアント クッキーあり Login');
          const token = await getCookie('irukaraAT');
          if (token) {
            const profile = await getProfile();
            console.log(
              `${logColor.green}finally profile...`,
              profile + logColor.reset,
            );
            if (profile) {
              store.dispatch(setUserProfile(profile));
            }
          }

          setLiffObject(liff);
          console.log('ローディング', isLoaded);
          setIsLoaded(true);
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
        <Provider store={store}>
          <Header liff={liffObject} />
          {isLoaded ? (
            <div className='main-contents'>{children}</div>
          ) : (
            <div className='main-contents'>色々ローディング中です</div>
          )}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
