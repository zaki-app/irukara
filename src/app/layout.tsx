import React from 'react';
import '@/styles/globals.scss';
import {
  DEFAULT_DESCRIPTION,
  SITE_CONFIG,
  SITE_TITLE,
} from '@/common/config/site.config';
import ProvidersWrapper from '@/components/client/template/ProvidersWrapper';
import { getServerSession } from 'next-auth';
import { SessionProps } from '@/types/auth';
import { options } from './api/auth/[...nextauth]/options';
// fetch error throw
// export const dynamic = 'force-dynamic';

// メタデータ
export const metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: SITE_CONFIG.ICON,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(options)) as SessionProps;
  return (
    <ProvidersWrapper session={session}>
      <div>{children}</div>
    </ProvidersWrapper>
  );
}
