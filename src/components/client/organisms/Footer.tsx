'use client';

import { footerList } from '@/common/meta/findMeta';

export default function Footer() {
  return (
    <footer>
      <p>{footerList.title}</p>
      <ul>
        <li>利用規約</li>
        <li>プライバシーポリシー</li>
        <li>特定商取引に基づく表記</li>
      </ul>
    </footer>
  );
}
