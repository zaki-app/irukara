'use client';

import { PriceCard, LineButton } from '@/components/client/atoms';
import { servicePriceList } from '@/common/config/site.config';

export default function TopServicePaid() {
  return (
    <div>
      <div>
        <h2>料金</h2>
      </div>
      <div>
        {servicePriceList.list.map((list) => (
          <div key={list.text}>
            <PriceCard text={list.text} price={list.price} />
          </div>
        ))}
      </div>
      <div>
        <LineButton />
      </div>
    </div>
  );
}
