'use client';

import { UpdateMessageData } from '@/types/fetchData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa6';

export default function ShareButton({
  messageId,
  shareStatus,
}: UpdateMessageData) {
  const router = useRouter();
  const [share, setShare] = useState<number>(0);

  useEffect(() => {
    setShare(shareStatus as number);
  }, []);

  async function shareHandler() {
    setShare(share === 0 ? 1 : 0);
    console.log('shareプロップス', shareStatus);
    // const response = await fetch('/api/message/share', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     messageId,
    //     shareStatus: share,
    //   }),
    // });

    // const resJson = await response.json();
    // console.log('結果', resJson);

    // if (resJson.result) {
    //   router.refresh();
    // }
  }

  return (
    <button
      className={`flex items-center px-4 py-1 rounded-lg ${
        share === 0 ? 'bg-green-500 text-white' : 'bg-gray-400'
      }`}
      onClick={shareHandler}
    >
      <FaShare className='mr-2' />
      <div>{share} share</div>
    </button>
  );
}
