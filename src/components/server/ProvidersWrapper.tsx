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
  const router = useRouter();

  async function liffInit() {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID ?? '';

    liff.init({ liffId });
    // 初期化できたか判定する
    liff.ready
      .then(async () => {
        if (!liff.isLoggedIn()) {
          setIsLogin(false);
          liff.login();
        }
        // ログイン後の処理
        if (!(await isCookie())) {
          console.log(await isCookie());
          const token = liff.getAccessToken();
          const isToken = await isVerifyToken(token ?? '');
          if (isToken) {
            // アクセストークンの有効性があればcookiesに保存 デフォルトのLIFFのcookies削除したい
            setCookie(token ?? '');
            router.push('/');
            console.log('Welcome to Irukara👍');
          } else {
            liff.login();
          }
        }

        // console.log('login後', liff.isLoggedIn());
        setLiffObject(liff);
        setIsLogin(true);
      })
      .catch((err) => {
        console.error('liff init error', err);
      });
  }

  useEffect(() => {
    liffInit();
  }, [isLogin]);

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
