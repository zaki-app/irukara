'use client';

import React, { Suspense } from 'react';
import { TodosType } from '@/common/types/TodoType';

// 基本的にコンポーネントに描画するものを記載する
function TodoLists({ results }: TodosType) {
  return (
    <Suspense fallback='loading...'>
      {results.map((todo) => (
        <div key={todo.id}>
          <p>
            {todo.id}:{todo.title}
          </p>
        </div>
      ))}
    </Suspense>
  );
}

export default TodoLists;
