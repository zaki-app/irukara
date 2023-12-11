import React from 'react';

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='w-full h-full flex flex-col'>{children}</div>;
}
