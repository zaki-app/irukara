'use client';

import { footerList } from '@/common/config/site.config';
import Link from 'next/link';
import { navbar } from '@/styles/common/styles';

export default function Footer() {
  return (
    <footer className={navbar.basic}>
      <p>{footerList.title}</p>
      {footerList.list.map((list) => (
        <ul key={list.title}>
          <Link href={list.href}>
            <li>{list.title}</li>
          </Link>
        </ul>
      ))}
    </footer>
  );
}
