'use client';

import Image from 'next/image';
import { IRUKARA_LOGO } from '@/common/config/site.config';
import { dateFormat } from '@/common/libs/dateFormat';
import { useEffect, useState } from 'react';
import { ProfileImage } from '@/components/client/atoms';
import textTruncate from '@/common/libs/textTruncate';
import Link from 'next/link';

interface SaveMessageProps {
  messageId: string;
  question: string;
  answer: string;
  createdAt: number | undefined;
}

export default function SaveMessageCard({
  messageId,
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
    <Link href={{ pathname: '/mypage/detail', query: { messageId } }}>
      <div>
        <div>
          <div>
            <ProfileImage />
          </div>
          <div>{textTruncate(question, 20)}</div>
        </div>
        <div>
          <div>
            <Image
              src={IRUKARA_LOGO.src ?? null}
              alt={IRUKARA_LOGO.alt}
              width={30}
              height={30}
            />
          </div>
          <div>{textTruncate(answer, 30)}</div>
        </div>
        <div>{createdAtTime}</div>
      </div>
    </Link>
  );
}
