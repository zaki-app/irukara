'use client';

import { SIZE } from '@/common/constants';
// import { API, IRUKARA_API } from '@/common/constants/path';
// import { getApi, relayPostApi } from '@/common/libs/api/lambda/requestClient';
// import { convertToBinary } from '@/common/utils/assets/convertToBinary';
import { Alert, Modal, Upload } from 'antd';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
// import { AiOutlinePlus } from 'react-icons/ai';

interface UploadImageProps {
  srcPath: string;
  altText: string;
  width?: number;
  height?: number;
}

/**
 * 画像表示とアップロード
 */
export default function UploadImage({
  srcPath,
  altText,
  width,
  height,
}: UploadImageProps) {
  const [isChange, setChange] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false);

  // デフォルトの選択モーダル出現
  function handleClick(e: any) {
    console.log('イベントです', e);
  }

  // 画像選択後
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log('画像選択後');
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const fileInfo = fileInput.files[0];

      // 5MBを超える場合はアラートを表示
      if (fileInfo.size < SIZE.FIVE_MB) {
        // S3へのアップデート処理
        console.log('name', fileInfo.name);
        console.log('size', fileInfo.size);
        console.log('mime', fileInfo.type);
        // バイナリデータへ変換
        // const binaryData = await convertToBinary(fileInfo);
        // console.log('バイナリデータ', binaryData);
        // const uploadResult = await relayPostApi(API.POST_S3_UPLOAD, {
        //   file: binaryData,
        // });
        // console.log('バイナリデータアップロード', uploadResult);
      } else {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 6000);
      }
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      {isAlert && (
        <div className='mb-4'>
          <Alert
            message='画像サイズは5MBまでになります'
            type='error'
            showIcon
          />
        </div>
      )}
      <section className='flex justify-between items-center'>
        <Image
          src={srcPath}
          alt={altText}
          width={width || 100}
          height={height || 100}
          className='rounded-full border-2 p-0 m-0'
        />
        <button className='text-[0.7rem] font-semibold cursor-pointer'>
          <label
            onClick={(e) => handleClick(e)}
            className='cursor-pointer'
            htmlFor='fileInput'
          >
            {isChange ? '保存' : '変更'}
            <input
              id='fileInput'
              type='file'
              accept='.jpg, .jpeg, .png, .webp'
              className='hidden'
              onChange={handleChange}
            />
          </label>
        </button>
      </section>
    </>
  );
}
