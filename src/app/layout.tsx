import React from 'react';
import '@/styles/globals.css';
import {
  defaultDescription,
  siteConfig,
  siteTitle,
} from '@/common/config/site.config';
import { Header, Footer } from '@/components/client';

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
    <html lang='ja'>
      <body>
        <Header />
        <div className='min-h-screen max-w-screen-lg'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
