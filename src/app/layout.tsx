import React from 'react';
import '@/styles/globals.scss';
import {
  defaultDescription,
  siteConfig,
  siteTitle,
} from '@/common/config/site.config';
import ProvidersWrapper from '@/components/client/template/ProvidersWrapper';
import { getServerSession } from 'next-auth';
import { SessionProps } from '@/types/auth';
import { options } from './api/auth/[...nextauth]/options';

// メタデータ
export const metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: defaultDescription,
  icons: {
    icon: siteConfig.icon,
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
