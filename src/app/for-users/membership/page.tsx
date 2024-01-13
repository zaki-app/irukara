import React from 'react';
import { servicePaid, servicePriceList } from '@/common/config/site.config';
import PriceCard from '@/components/client/atoms/ui/card/PriceCard';
import { StatePlan } from '@/components/client/organisms';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';

export default async function Paid() {
  return (
    <ContentsWrapper>
      <div>
        <div>
          <StatePlan text='現在のプラン' />
        </div>
        <div>
          <h1>{servicePaid.title1}</h1>
          <p>{servicePaid.description1}</p>
          <p>{servicePaid.description2}</p>
        </div>
        <div>
          <div>
            <h2>{servicePaid.title2}</h2>
          </div>
          <div>
            {servicePriceList.list.map((list) => (
              <div key={list.text}>
                <PriceCard text={list.text} price={list.price} />
              </div>
            ))}
          </div>
          <div>
            <div>
              <h2>{servicePaid.line}</h2>
            </div>
          </div>
        </div>
      </div>
    </ContentsWrapper>
  );
}
