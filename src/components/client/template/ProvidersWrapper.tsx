'use client';

import { Header } from '@/components/client/organisms';
import { Suspense, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';
import { SessionUserInfo } from '@/types/auth';
import { clearUserProfile, setUserProfile } from '@/store/auth/slice';
import Analytics from '../atoms/gtag/Analytics';
import StyledComponentsRegistry from '../molecules/login/libs/AntdRegistry';
import RoundSpinner from '../atoms/ui/spinner/Round';
import AlertIcon from '../atoms/ui/alert/AlertIcon';

export default function ProvidersWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionUserInfo;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useMemo(() => {
    setIsLoaded(true);

    // clientはreduxで認証状況を確認する
    if (session) {
      const authUser = { ...session, isAuth: true };
      store.dispatch(setUserProfile(authUser));

      console.log('セッション情報？', session);
    } else {
      store.dispatch(clearUserProfile());
    }

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
                <AlertIcon />
                <RoundSpinner />
                <main className='main-contents'>{children}</main>
              </StyledComponentsRegistry>
            ) : (
              <RoundSpinner />
            )}
            <div id='app-modal' />
            <div id='hamburger' />
            {/* <Footer /> */}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
