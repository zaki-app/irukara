import React from 'react';

interface CommonWrapperProps {
  colorName?: string;
  styleName?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({
  colorName,
  styleName,
  children,
}: CommonWrapperProps) {
  return (
    <section className={colorName}>
      <div className={styleName}>{children}</div>
    </section>
  );
}
