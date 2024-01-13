import { Kanit } from 'next/font/google';

// kanitフォントを使用するコンポーネント
const kanit = Kanit({
  weight: '700',
  preload: false,
});

export default function KanitFont({
  // tag,
  fontStyle,
  text,
}: {
  // tag: any;
  fontStyle: string;
  text: string;
}) {
  return <div className={`${kanit.className} ${fontStyle}`}>{text}</div>;
}
