'use client';

import { Header, Footer } from '@/components/client/organisms';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';
import { SessionProps } from '@/types/auth';
import { setUserProfile } from '@/store/auth/slice';

export default function ProvidersWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProps;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  console.log('クライアントsession', session);

  if (session?.user) {
    store.dispatch(setUserProfile(session.user));
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <html lang='ja'>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <Header />
            {isLoaded ? (
              <div className='main-contents'>{children}</div>
            ) : (
              <div className='main-contents'>色々ローディング中です</div>
            )}
            <div id='login-modal' />
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
