'use client';

import PriceCard from '@/components/client/atoms/ui/card/PriceCard';
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
      <div>{/* <LineButton type={1} /> */}</div>
    </div>
  );
}
