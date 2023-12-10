'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

export default function StyledComponentsRegistry({
  children,
}: React.PropsWithChildren) {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (!isServerInserted.current) {
      // } else {
      isServerInserted.current = true;
      return (
        <style
          id='antd'
          dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
        />
      );
    }
    return null;
  });
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
