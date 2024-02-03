'use client';

import { COOKIE_NAME, EDIT_PROFILE } from '@/common/constants';
import { API } from '@/common/constants/path';
import { relayPutApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { commonValidate } from '@/common/utils/varidate/input';
import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface EditProfileRecordProps {
  showName: string;
  type: number;
}

/**
 * ユーザープロフィール画面から現在の情報を表示、更新する(テキスト)
 * @param showName 表示するプロフィール情報
 * @param type 1..name, 2..email
 */
export default function EditProfileRecord({
  showName,
  type,
}: EditProfileRecordProps) {
  const editProfileRef = useRef<HTMLDivElement>(null);

  const [isClick, setClick] = useState<boolean>(false);
  const [isSpinner, setSpinner] = useState<boolean>(false);
  const [strShowName, setShowName] = useState<string>(showName);

  const router = useRouter();

  function changeArea() {
    setClick(true);
  }

  // ユーザー情報を更新
  async function editProfile() {
    setSpinner(true);
    const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);

    // typeにより更新項目を分ける
    let params;
    if (type === EDIT_PROFILE.NAME) {
      params = { name: strShowName };
    } else if (type === EDIT_PROFILE.EMAIL) {
      params = { email: strShowName };
    }

    const path = API.PUT_USER.replace('{:userId}', userId);
    const result = await relayPutApi(path, params);
    console.log('とりあえずの結果', result, result.status);
    if (result) {
      // 更新成功時の処理
      setClick(false);
      router.refresh();
    }
    setSpinner(false);
  }

  useEffect(() => {
    // このコンポーネント以外をクリックしたらinputは閉じる
    const handleClickOut = (e: MouseEvent) => {
      if (
        editProfileRef.current &&
        !editProfileRef.current.contains(e.target as Node)
      ) {
        setClick(false);
      }
    };

    document.addEventListener('click', handleClickOut);

    return () => {
      document.removeEventListener('click', handleClickOut);
    };
  }, [editProfileRef]);

  return (
    <div className='flex items-center justify-between' ref={editProfileRef}>
      {isClick ? (
        <input
          type='text'
          value={strShowName}
          onChange={(e) => {
            setShowName(e.target.value);
            commonValidate(e.target.value, 30);
          }}
        />
      ) : (
        <>{showName}</>
      )}
      {isClick ? (
        <button className='' onClick={() => editProfile()}>
          {isSpinner ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 18,
                  }}
                  spin
                />
              }
            />
          ) : (
            '保存'
          )}
        </button>
      ) : (
        <button
          className='text-[0.7rem] font-semibold'
          onClick={() => changeArea()}
        >
          変更
        </button>
      )}
    </div>
  );
}
