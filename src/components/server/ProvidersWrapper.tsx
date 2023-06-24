'use client';

import { Header, Footer } from '@/components/client/organisms';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import type { Liff } from '@line/liff/exports';
import { useRouter } from 'next/navigation';
import { setCookie, isCookie } from '@/common/utils/authLINE/manageCookies';
import isVerifyToken from '@/common/utils/authLINE/isVerifyToken';

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [liffObject, setLiffObject] = useState<Liff | null>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>('');
  const [isToken, setIsToken] = useState<boolean | undefined>(false);
  const router = useRouter();

  async function liffInit() {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID ?? '';

    liff.init({ liffId });
    // 初期化できたか判定する
    liff.ready
      .then(async () => {
        if (!liff.isLoggedIn()) {
          // setIsLogin(false);
          liff.login();
        }
        // ログイン後の処理
        if (!(await isCookie())) {
          console.log('クッキー', await isCookie());
          setToken(liff.getAccessToken());
          console.log('トークン', token);
          setIsToken(await isVerifyToken(token ?? ''));
          console.log('トークンboolean', isToken);
          if (isToken) {
            // アクセストークンの有効性があればcookiesに保存 デフォルトのLIFFのcookies削除したい
            setCookie(token ?? '');
            router.push('/');
            console.log('Welcome to Irukara👍');
          }
        }

        setLiffObject(liff);
        setIsLogin(true);
        console.log('ログイン', isLogin);
      })
      .catch((err) => {
        console.error('liff init error', err);
      });
  }

  useEffect(() => {
    liffInit();
  }, [isToken, isLogin]);

  return (
    <html lang='ja'>
      <body>
        {isLogin ? (
          <>
            <Header liff={liffObject} />
            {children}
            <Footer />
          </>
        ) : (
          <div>loading...</div>
        )}
      </body>
    </html>
  );
}
