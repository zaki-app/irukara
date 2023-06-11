export const siteTitle = 'Irukara.net';

export const defaultDescription =
  'IrukaraはLINE公式アカウントも運営しており、LINE上で保存したメッセージをIrukaraに保存して見返すことができる画期的なサービスです。すぐにお友達登録して一緒にお話ししましょう！';

export const siteConfig = {
  siteTitle: 'Irukara',
  topHref: '/',
  icon: '/tokeru.svg',
  headerLogo: '/images/irukara-logo.webp',
  logoAlt: 'Irukaraロゴ',
  headerList: [
    {
      title: '使い方',
      href: '/usage',
    },
    {
      title: 'お問い合わせ',
      href: '/contact',
    },
    {
      title: '料金プラン',
      href: '/paid',
    },
  ],
};

// フッターリスト
export const footerList = {
  title: '©︎ 2023 All rights reserved Irukara',
  icon: '/images/irukara.webp',
  list: [
    { title: '利用規約', href: '/policy-suite/terms' },
    { title: 'プライバシーポリシー', href: '/policy-suite/privacy-policy' },
    {
      title: '特定商取引に基づく表示',
      href: '/policy-suite/specified-commercial',
    },
  ],
};
