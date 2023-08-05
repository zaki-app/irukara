import React from 'react';

export default function ContentsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='contents-wrapper'>{children}</div>;
}
