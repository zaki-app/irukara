'use client';

import { ALERT_TYPE, IMAGE_TYPE, SHARE } from '@/common/constants';
import { API } from '@/common/constants/path';
import { store } from '@/store';
import { setAlert } from '@/store/ui/alert/slice';
import { Popconfirm } from 'antd';
import { Button } from 'antd/es/radio';
import { useEffect, useState } from 'react';

interface ShareButtonProps {
  type: number;
  shareStatus: number;
  createdAt: number;
  imageId?: string;
  messageId?: string;
}

/**
 * 生成メッセージ・画像を共有
 * @param type SELECT_MODE
 * @returns
 */
export default function ShareButton({
  type,
  imageId,
  messageId,
  shareStatus,
  createdAt,
}: ShareButtonProps) {
  console.log(
    '画像更新プロップス',
    type,
    imageId,
    shareStatus,
    messageId,
    createdAt,
  );
  const [isShare, setShare] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);

  // 共有は1
  async function updateShare(shareType: number) {
    if (shareType === SHARE.SAVE) {
      console.log('共有解除');
      // 共有解除 shareStatusを0にする
      const path = API.RELAY_PUT_ILLUST.replace(
        '{imageId}',
        imageId as string,
      ).replace('{createdAt}', createdAt.toString());
      const response = await fetch(path, {
        method: 'PUT',
        body: JSON.stringify({
          imageId,
          createdAt,
          shareStatus: SHARE.CANCEL,
          type: IMAGE_TYPE.ILLUST,
        }),
      });
      console.log('クライアント更新処理', response);

      if (response.ok) {
        // 更新成功アラート
        store.dispatch(
          setAlert({
            isAlert: true,
            message: '共有を解除しました',
            numAlertType: ALERT_TYPE.SUCCESS,
          }),
        );
        setShare(false);
      } else {
        // 失敗アラート
        // setShare(false);
      }
    } else if (shareType === SHARE.CANCEL) {
      console.log('特に何もしない');
      // setShare(false);
    }
    setConfirm(false);
  }

  useEffect(() => {
    if (shareStatus === SHARE.SAVE) {
      setShare(true);
    } else {
      setShare(false);
    }
  }, []);

  return (
    <Popconfirm
      placement='right'
      title='共有を解除しますか？'
      description='共有を解除すると他のユーザーが見ることができなくなります'
      open={isConfirm}
      okText='解除'
      cancelText='キャンセル'
      okButtonProps={{
        style: {
          backgroundColor: '#3b82f6',
          color: 'your-text-color',
        },
      }}
      onConfirm={() => updateShare(SHARE.SAVE)}
      onCancel={() => updateShare(SHARE.CANCEL)}
    >
      <Button
        onClick={async () => {
          if (isShare) {
            // 共有を解除
            console.log('共有を解除 modalを出す');
            setConfirm(true);
          } else {
            console.log('共有クリック');
            // 共有クリック shareStatusを1にする
            const path = API.RELAY_PUT_ILLUST.replace(
              '{imageId}',
              imageId as string,
            ).replace('{createdAt}', createdAt.toString());
            const response = await fetch(path, {
              method: 'PUT',
              body: JSON.stringify({
                imageId,
                createdAt,
                shareStatus: SHARE.SAVE,
                type: IMAGE_TYPE.ILLUST,
              }),
            });
            console.log('クライアント更新処理', response);
            if (response.ok) {
              // 更新成功アラート
              store.dispatch(
                setAlert({
                  isAlert: true,
                  message: '共有しました！',
                  numAlertType: ALERT_TYPE.SUCCESS,
                }),
              );
              setShare(true);
            } else {
              // 失敗アラート
              // setShare(false);
            }
          }
        }}
      >
        {isShare ? '解除' : '共有'}
      </Button>
    </Popconfirm>
  );
}
