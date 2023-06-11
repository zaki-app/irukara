'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  console.log('クライアントコンポーネント');

  return (
    <div>
      <p>
        カウント:
        {count}
      </p>
      <button onClick={() => setCount(count + 1)}>クリック！</button>
    </div>
  );
}
