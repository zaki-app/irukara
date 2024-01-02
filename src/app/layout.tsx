import React from 'react';
import '@/styles/globals.scss';
import {
  DEFAULT_DESCRIPTION,
  SITE_CONFIG,
  SITE_TITLE,
} from '@/common/config/site.config';
import ProvidersWrapper from '@/components/client/template/ProvidersWrapper';
import { getServerSession } from 'next-auth';
import type { SessionUserInfo } from '@/types/auth';
import { signOut } from 'next-auth/react';
import { CALLBACK } from '@/common/constants/path';
import { options } from './api/auth/[...nextauth]/options';

// メタデータ
export const metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: SITE_CONFIG.ICON,
    apple: SITE_CONFIG.ICON,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(options)) as SessionUserInfo;

  return <ProvidersWrapper session={session}>{children}</ProvidersWrapper>;
}
