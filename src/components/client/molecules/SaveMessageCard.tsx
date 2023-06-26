'use client';

import Image from 'next/image';
import { irukaraLogo } from '@/common/config/site.config';
import dateFormat from '@/common/libs/dateFromat';
import { useEffect, useState } from 'react';
import { ProfileImage } from '@/components/client/atoms';

export interface UserProfile {
  displayName: string;
  pictureUrl: string;
}
interface SaveMessageProps {
  question: string;
  answer: string;
  createdAt: number | undefined;
}

export default function SaveMessageCard({
  question,
  answer,
  createdAt,
}: SaveMessageProps) {
  const [createdAtTime, setCreatedAtTime] = useState<string>('');

  // UNIX時間を変換
  useEffect(() => {
    setCreatedAtTime(dateFormat(createdAt ?? 0));
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
            src={irukaraLogo.src ?? null}
            alt={irukaraLogo.alt}
            width={30}
            height={30}
          />
        </div>
        <div>{answer}</div>
      </div>
      <div>{createdAtTime}</div>
    </div>
  );
}
