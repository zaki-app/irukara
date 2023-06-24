'use client';

export default function LineButton() {
  const LINEME = process.env.NEXT_PUBLIC_LINE_ME ?? '';
  return (
    <div>
      <a href={LINEME} target='_blank' rel='noreferrer'>
        <img
          src='https://scdn.line-apps.com/n/line_add_friends/btn/ja.png'
          alt='IrukaraのLINE友だち追加です'
          height='36'
        />
      </a>
    </div>
  );
}
