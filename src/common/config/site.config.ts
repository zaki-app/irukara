export const siteTitle = 'Irukara.net';

export const defaultDescription =
  'IrukaraはLINE公式アカウントも運営しており、LINE上で保存したメッセージをIrukaraに保存して見返すことができる画期的なサービスです。すぐにお友達登録して一緒にお話ししましょう！';

export const irukaraLogo = {
  src: '/images/irukara-logo.webp',
  alt: 'Irukara.netのキャラクターロゴ',
};

export const siteConfig = {
  siteTitle: 'Irukara',
  topHref: '/',
  icon: '/tokeru.svg',
  headerLogo: '/images/irukara-logo.webp',
  logoAlt: 'Irukaraロゴ',
  headerList: [
    {
      title: '使い方',
      href: '/for-users/usage',
    },
    {
      title: 'お問い合わせ',
      href: '/for-users/contact',
    },
    {
      title: '料金プラン',
      href: '/for-users/membership',
    },
  ],
};

// フッターリスト
export const footerList = {
  title: '©︎ 2023 All rights reserved Irukara',
  icon: '/images/irukara.webp',
  list: [
    { title: '利用規約', href: '/legal/irukara-terms' },
    { title: 'プライバシーポリシー', href: '/legal/privacy-policy' },
    {
      title: '特定商取引に基づく表示',
      href: '/legal/specified-commercial',
    },
  ],
};

// 使い方
export const usedServiceList = {
  title: '一番簡単な方法はLINEで使用する方法です！',
  list: [
    { number: '①', text: '友達になる' },
    { number: '②', text: 'メッセージを送ってみる' },
    { number: '③', text: '回答が返ってくる' },
    { number: '④', text: '保存するボタンをタップ！' },
    { number: '⑤', text: 'LINE画面の下にあるリッチメニューをタップ！' },
    { number: '⑥', text: 'Irukara.netのマイページで確認' },
  ],
};

// 料金
export const servicePaid = {
  title1: '料金について',
  description1: 'Irukaraでは3つのプランをご用意しております。',
  description2: 'それぞれのプランを選択していただくと決済画面に移動します。',
  title2: '選べる3つのプラン',
  line: 'まだお友達になっていない方は',
};
export const servicePriceList = {
  list: [
    { text: 'メッセージ30通無料・保存3回', price: '無料' },
    { text: 'メッセージ100通無料・保存50回', price: '350円(1ヶ月)' },
    { text: 'メッセージ・保存回数無制限', price: '870円(1ヶ月)' },
  ],
};

// トップ画面ラストメッセージ
export const lastMessage = '今すぐIrukaraとお友達になって、お話ししましょう';

// alt文字
export const userIcon = 'ユーザーアイコン画像';
