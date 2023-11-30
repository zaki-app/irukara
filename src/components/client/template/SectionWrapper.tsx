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
      <div className={`text-gray-500 ${styleName && styleName}`}>
        {children}
      </div>
    </section>
  );
}
