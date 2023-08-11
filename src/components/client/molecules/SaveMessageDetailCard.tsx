'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { irukaraLogo } from '@/common/config/site.config';
import { dateFormat } from '@/common/libs/dateFromat';
import { ProfileImage } from '@/components/client/atoms';

interface DetailProps {
  question: string;
  answer: string;
  createdAt: number | undefined | null;
  updatedAt: number | undefined | null;
}

export default function SaveMessageDetailCard({
  question,
  answer,
  createdAt,
  updatedAt,
}: DetailProps) {
  const [dateTime, setDateTime] = useState<string>('');
  const [insertBr, setInsertBr] = useState<string>('');

  function dateFormatProcess() {
    if (updatedAt) {
      setDateTime(dateFormat(updatedAt ?? 0));
    } else {
      setDateTime(dateFormat(createdAt ?? 0));
    }
  }

  /* 改行が含まれている場合改行する処理 */
  function insertBrProcess() {
    const pattern = /\n/g;
    const changePattern = answer.replace(pattern, '<br>');
    setInsertBr(changePattern);
  }

  useEffect(() => {
    dateFormatProcess();
    insertBrProcess();
  }, []);

  return (
    <div>
      <div>
        <div>
          <ProfileImage />
        </div>
        <div>{question}</div>
      </div>
      <div>
        <div>
          <Image
            src={irukaraLogo.src}
            alt={irukaraLogo.alt}
            width={30}
            height={30}
          />
        </div>
        {answer ? (
          <div dangerouslySetInnerHTML={{ __html: insertBr }} />
        ) : (
          <div>変換できません</div>
        )}
        <div>{dateTime}</div>
      </div>
    </div>
  );
}
