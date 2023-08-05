import { Kanit } from 'next/font/google';

// kanitフォントを使用するコンポーネント
const kanit = Kanit({
  weight: '700',
  preload: false,
});

export default function KanitFont({
  tag,
  fontStyle,
  text,
}: {
  tag: any;
  fontStyle: any;
  text: any;
}) {
  const Tag = tag;
  return <Tag className={`${kanit.className} ${fontStyle}`}>{text}</Tag>;
}
