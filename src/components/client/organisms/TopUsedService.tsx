'use client';

import { usedServiceList } from '@/common/config/site.config';
import { LineButton } from '@/components/client/atoms';
import Link from 'next/link';

export default function TopUsedService() {
  return (
    <div>
      <div>
        <h2>使い方</h2>
      </div>
      <div>
        <div>
          <h3>{usedServiceList.title}</h3>
        </div>
        <div>
          {usedServiceList.list.map((list) => (
            <ul key={list.number}>
              <li>
                {list.number} {list.text}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <LineButton />
        </div>
        <div>
          <Link href='/usage'>使い方を詳しくみる</Link>
        </div>
      </div>
    </div>
  );
}
