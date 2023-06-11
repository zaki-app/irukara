import React from 'react';
import '@/styles/globals.css';
import { metaDescription, metaTitle } from '@/common/meta/findMeta';
import Header from '@/components/client/organisms/Header';
import Footer from '@/components/client/organisms/Footer';

// メタデータ
export const metadata = {
  title: {
    default: metaTitle,
    template: `%s | ${metaTitle}`,
  },
  description: metaDescription,
  icons: {
    icon: '/tokeru.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
