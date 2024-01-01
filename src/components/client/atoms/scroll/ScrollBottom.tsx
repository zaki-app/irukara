'use client';

import { RootState } from '@/store';
import { ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

/**
 * 一番下へ自動スクロールする
 * @param option {trueは滑らかなスクロール}
 * @returns
 */
export default function ScrollBottom({
  children,
  className,
  option,
}: {
  children: ReactNode;
  className?: string;
  option?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isScroll } = useSelector((state: RootState) => state.scrollSlice);

  useEffect(() => {
    if (option) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    console.log('isScroll', isScroll);
  }, [isScroll]);

  return (
    <div className={`${className}`}>
      {children}
      <div ref={scrollRef} />
    </div>
  );
}
