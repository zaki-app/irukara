export const SITE_TITLE = 'Irukara.net';

export const DEFAULT_DESCRIPTION =
  'IrukaraはLINE公式アカウントも運営しており、LINE上で保存したメッセージをIrukaraに保存して見返すことができる画期的なサービスです。すぐにお友達登録して一緒にお話ししましょう！';

export const IRUKARA_LOGO = {
  src: '/images/Irukara-left.png',
  alt: 'Irukara.netのキャラクターロゴ',
};

export const SITE_CONFIG = {
  TITLE: 'Irukara',
  TOP_HREF: '/',
  ICON: '/logo/irukara-logo.svg',
  HEADER_LOGO: '/logo/irukara-logo.svg',
  LOGO_ALT: 'Irukaraロゴ',
  HEADER_LIST: [
    {
      id: 1,
      title: '使い方',
      href: '/for-users/usage',
    },
    {
      id: 2,
      title: 'お問い合わせ',
      href: '/for-users/contact',
    },
    {
      id: 3,
      title: '料金プラン',
      href: '/for-users/membership',
    },
  ],
  LOGIN_USER: [
    {
      id: 1,
      title: 'プロフィール',
      href: '#',
    },
  ],
};

// フッターリスト
export const FOOTER_LIST = {
  TITLE: '©︎ 2023 All rights reserved Irukara',
  ICON: '/images/irukara.webp',
  LIST: [
    { title: '利用規約', href: '/legal/irukara-terms' },
    { title: 'プライバシーポリシー', href: '/legal/privacy-policy' },
    {
      title: '特定商取引に基づく表示',
      href: '/legal/specified-commercial',
    },
    {
      title: 'お問い合わせ',
      href: '/for-users/contact',
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

// lineロゴ
export const lineLogo = '/logo/LINE_Brand_icon.png';
export const googleLogo = '/logo/google.svg';

// irukara画像パス
export const irukaraBasic = '/images/Irukara-left.png';
export const irukaraSmile = '/images/Irukara-smile.png';
export const irukamoBasic = '/images/Irukamo.png';

// irukara画像ALT
export const irukaraBasicAlt = 'イルカラのキャラクター画像';
export const irukaraSmileAlt = 'イルカラのキャラクター画像(笑顔)';
export const irukamoBasicAlt = 'イルカモのキャラクター画像';

// デフォルトユーザー
export const DEFAULT_USER_LOGO = '/images/User.svg';

// 生成タブ
export const TAB_LIST = [
  {
    key: 1,
    name: 'チャットモード(GPT3.5)',
  },
  {
    key: 2,
    name: 'チャットモード(GPT4)',
  },
  {
    key: 3,
    name: 'イラストモード',
  },
  {
    key: 4,
    name: 'リアルモード',
  },
];
