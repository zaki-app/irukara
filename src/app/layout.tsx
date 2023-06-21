import React from 'react';
import '@/styles/globals.css';
import {
  defaultDescription,
  siteConfig,
  siteTitle,
} from '@/common/config/site.config';
import ProvidersWrapper from '@/components/server/ProvidersWrapper';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersWrapper>
      <div className='min-h-screen max-w-screen-lg'>{children}</div>
    </ProvidersWrapper>
  );
}
