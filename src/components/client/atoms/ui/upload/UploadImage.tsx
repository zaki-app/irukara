'use client';

import { COOKIE_NAME } from '@/common/constants';
import { API } from '@/common/constants/path';
import { VALIDATE } from '@/common/constants/validate';
import { getApi, relayPutApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { computeSHA256 } from '@/common/utils/image';
import { Alert, Modal, Upload } from 'antd';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import CropImage from '../crop/CropImage';

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
  console.log('サイズ', width, height);
  const [isChange, setChange] = useState<boolean>(false);
  const [isButtonChange, setButtonChange] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  // 画像選択後
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log('画像選択後', e);
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }

    setChange(true);
    setButtonChange(true);
  }

  // s3へアップロード
  async function s3upload(e: any) {
    e.preventDefault();
    setButtonChange(false);

    if (file) {
      // 著名付きURLを取得
      const checksum = await computeSHA256(file);
      const path = API.GET_SIGNED_URL.replace('{:type}', file.type)
        .replace('{:size}', file.size.toString())
        .replace('{:checksum}', checksum);
      const { success, url, message } = await getApi(path);

      if (success) {
        // 著名付きURLを使用して実際にアップロード
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        if (res.ok) {
          const imageUrl = res.url.split('?')[0];
          // UsersTableを更新する
          const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);
          const path = API.PUT_USER.replace('{:userId}', userId);
          const result = await relayPutApi(path, { pictureUrl: imageUrl });
          console.log('DB更新終了', result);
        } else {
          setAlert(true);
          setAlertMsg(VALIDATE.OTHER_ERROR);
          setTimeout(() => {
            setAlert(false);
          }, 6000);
        }
      } else {
        // 著名付きURLが発行できなかった場合はエラーを表示
        setAlert(true);
        setAlertMsg(message);
        setTimeout(() => {
          setAlert(false);
        }, 6000);
      }
    }
  }

  // アップロードをキャンセル
  function uploadCancel() {
    setChange(false);
  }

  return (
    <>
      {isAlert && (
        <div className='mb-4'>
          <Alert message={alertMsg} type='error' showIcon />
        </div>
      )}
      <section className='flex justify-between items-center'>
        {/* 変更した時は現在の画像から変更後の画像をpreview */}
        <div className='w-[100px] h-[100px] aspect-square'>
          {isChange && file && fileUrl ? (
            <CropImage
              fileUrl={fileUrl}
              setChange={setChange}
              s3upload={(e) => s3upload(e)}
            />
          ) : (
            <Image
              src={srcPath}
              alt={altText}
              width={100}
              height={100}
              objectFit=''
              className='rounded-full border-2 shadow-sm h-full w-full'
            />
          )}
        </div>
        <div className='text-[0.7rem] font-semibold'>
          {/* {isButtonChange ? (
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => s3upload(e)}>保存</button>
              <button onClick={() => uploadCancel()}>キャンセル</button>
            </div>
          ) : ( */}
          <label htmlFor='fileInput' className='cursor-pointer'>
            変更
            <input
              type='file'
              id='fileInput'
              onChange={(e) => handleChange(e)}
              style={{ display: 'none' }}
              accept='image/jpeg,image/png,image/webp,image/jpg'
            />
          </label>
          {/* )} */}
        </div>
      </section>
    </>
  );
}
