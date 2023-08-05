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

        // browser登録後(tokenのcookieがない場合 アクセストークンを取得して有効性を確認)
        if (!(await getCookie('irukara'))) {
          console.log('クライアントクッキーあり');
          const token = liff.getAccessToken();
          const isToken = await isVerifyToken(token ?? '');
          if (token && isToken) {
            setCookie('irukara', token ?? '');
            setIsLoaded(true);
            router.push('/');
            console.log('Welcome to Irukara👍');
          }
        }

        // irukaraのcookieあり アクセストークンがある場合プロフィールを取得する
        try {
          console.log('クライアント クッキーあり');
          const token = await getCookie('irukara');
          if (token) {
            const profile = await getProfile();
            if (profile) {
              store.dispatch(setUserProfile(profile));
            }
          }

          setLiffObject(liff);
          console.log('ローディング', isLoaded);
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
        {isLoaded ? (
          <Provider store={store}>
            <Header liff={liffObject} />
            <div className='main-contents'>{children}</div>
            <Footer />
          </Provider>
        ) : (
          <div>loading...</div>
        )}
      </body>
    </html>
  );
}
