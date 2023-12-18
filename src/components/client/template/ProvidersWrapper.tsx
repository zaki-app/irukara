'use client';

import { Header, Footer } from '@/components/client/organisms';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider, signOut } from 'next-auth/react';
import { SessionUserInfo } from '@/types/auth';
import { clearUserProfile, setUserProfile } from '@/store/auth/slice';
import { CALLBACK } from '@/common/constants/path';
import { allDeleteCookies, isAllCookies } from '@/common/utils/manageCookies';
import { Loading } from '../atoms';
import Analytics from '../atoms/gtag/Analytics';
import StyledComponentsRegistry from '../molecules/login/libs/AntdRegistry';

export default function ProvidersWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionUserInfo;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // clientはreduxで認証状況を確認する
  if (session) {
    const authUser = { ...session, isAuth: true };
    store.dispatch(setUserProfile(authUser));
  } else {
    store.dispatch(clearUserProfile());
  }

  async function signOutHandler() {
    // サインアウト
    await allDeleteCookies();
  }

  useMemo(() => {
    setIsLoaded(true);
    // cookieの有効期限切れ時は削除する
    // (async () => {
    //   const isCookie = await isAllCookies();
    //   if (!session && isCookie) {
    //     if (isCookie) {
    //       await signOutHandler();
    //     }
    //     console.log('処理されている');
    //   }
    // })();
    // }
  }, []);

  return (
    <html lang='ja'>
      <body>
        <Suspense>
          <Analytics />
        </Suspense>
        <SessionProvider>
          <Provider store={store}>
            <Header />
            {isLoaded ? (
              <StyledComponentsRegistry>
                <div className='main-contents'>{children}</div>
              </StyledComponentsRegistry>
            ) : (
              <Loading opacity={1} />
            )}
            <div id='login-modal' />
            <div id='hamburger' />
            {/* <Footer /> */}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
