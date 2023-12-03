'use client';

import { Header, Footer } from '@/components/client/organisms';
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';
import { SessionUserInfo } from '@/types/auth';
import { setUserProfile } from '@/store/auth/slice';
import { Loading } from '../atoms';
import Analytics from '../atoms/gtag/Analytics';
import StyledComponentsRegistry from '../molecules/auth/libs/AntdRegistry';

export default function ProvidersWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionUserInfo;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if (session) {
    // clientはreduxからユーザー情報を取得する
    const authUser = { ...session, isAuth: true };
    store.dispatch(setUserProfile(authUser));
  }

  useEffect(() => {
    setIsLoaded(true);
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
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
