'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import { SaveImageData } from '@/common/types/fetchData';
import textTruncate from '@/common/libs/textTruncate';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ImageDataProps {
  mode: number;
}

// 遅延
// await new Promise((resolve) => setTimeout(resolve, 1000))

// async function getSaveImages(mode: number) {
//   const endpoint = `/api/image?mode=${mode}`;
//   const res = await fetch(endpoint, {
//     method: 'GET',
//     cache: 'force-cache',
//   });
//   const { imageData } = await res.json();

//   return imageData;
// }

// async function fetchSaveImage(page: number, mode: number) {
//   const { data } = await getSaveImages(mode);
//   return data.slice((page - 1) * 2, page * 2);
// }

export default function ImageSaveList({ mode }: ImageDataProps) {
  console.log('image save props', mode);
  // const [imageData, setImageData] = useState<SaveImageData>();
  // const [imageCount, setImageCount] = useState<number>(0);

  useMemo(async () => {
    // const endpoint = `/api/image?mode=${mode}`;
    // const res = await fetch(endpoint, {
    //   method: 'GET',
    //   cache: 'force-cache',
    // });
    // const { imageData } = await res.json();
    // setImageCount(imageData.count);
    // setImageData(imageData.data);
  }, []);

  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   ['query'],
  //   async ({ pageParam = 1 }) => {
  //     const response = await fetchSaveImage(pageParam);
  //     return response;
  //   },
  //   {
  //     getNextPageParam: (foo, pages) => {
  //       console.log('何が入ってる？', foo);
  //       console.log('ページ', pages);
  //       return pages.length + 1;
  //     },
  //     initialData: {
  //       pages: [],
  //     },
  //   },
  // );

  return (
    <div>
      {/* {imageCount > 0 && Array.isArray(imageData) ? (
        imageData.map((item) => (
          <div key={item.imageId}>
            <Suspense fallback='イラスト画像関係をローディング'>
              <Image
                src={item.imageUrl}
                alt='イラスト画像'
                width={300}
                height={300}
              />
              <div>{textTruncate(item.prompt, 20)}</div>
            </Suspense>
          </div>
        ))
      ) : (
        <div>
          {mode === 1 ? 'イラストデータ' : 'リアル画像データ'}が見つかりません
        </div>
      )} */}
      修正中
    </div>
  );
}
