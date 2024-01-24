'use client';

import {
  ALERT_COM_TYPE,
  ALERT_TYPE,
  IMAGE_TYPE,
  SELECT_MODE,
  SHARE,
} from '@/common/constants';
import { API } from '@/common/constants/path';
import { store } from '@/store';
import { setAlert } from '@/store/ui/alert/slice';
import { Popconfirm, Spin } from 'antd';
import { Button } from 'antd/es/radio';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface ShareButtonProps {
  type: number;
  shareStatus: number;
  createdAt: number;
  imageId?: string;
  messageId?: string;
}

/**
 * 生成メッセージ・画像共有を切り替えるボタン
 * @param type SELECT_MODE
 * @param imageId PK
 * @param messageId PK
 * @param shareStatus 1...共有 0...共有してない
 * @param createdAt SK
 * @returns
 */
export default function ShareButton({
  type,
  imageId,
  messageId,
  shareStatus,
  createdAt,
}: ShareButtonProps) {
  const [isShare, setShare] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [isWait, setWait] = useState<boolean>(false);
  console.log('共有ボタン', type, imageId, messageId, shareStatus, createdAt);

  async function updateShare(updateType: number) {
    setWait(true);
    let path;
    let response;

    if (type === SELECT_MODE.ILLUST || type === SELECT_MODE.REAL) {
      let imageType;
      if (type === SELECT_MODE.ILLUST) {
        // イラスト
        path = API.RELAY_PUT_ILLUST.replace('{:userId}', imageId as string);
        imageType = IMAGE_TYPE.ILLUST;
      } else if (type === SELECT_MODE.REAL) {
        // リアル画像用
      }
      console.log('エンドポイント', path);
      response = await fetch(path as string, {
        method: 'PUT',
        body: JSON.stringify({
          imageId,
          createdAt,
          shareStatus: updateType,
          type: imageType, // 画像タイプ
        }),
      });
    } else if (type === SELECT_MODE.GPT3 || type === SELECT_MODE.GPT4) {
      if (type === SELECT_MODE.GPT3) {
        // chat3.5
        path = API.RELAY_PUT_MSG.replace('{:userId}', messageId as string);
      }
      response = await fetch(path as string, {
        method: 'PUT',
        body: JSON.stringify({
          messageId,
          createdAt,
          shareStatus: updateType,
          type,
        }),
      });
    }

    setWait(false);
    return response;
  }

  // 共有は1
  async function confirmDialog(shareType: number) {
    if (shareType === SHARE.SAVE) {
      // 共有解除 shareStatusを0に更新
      const response = await updateShare(SHARE.CANCEL);

      if (response && response.ok) {
        // 更新成功アラート
        store.dispatch(
          setAlert({
            isAlert: true,
            numType: ALERT_COM_TYPE.SIMPLE,
            message: '共有を解除しました',
            alertType: ALERT_TYPE.SUCCESS,
          }),
        );
        setShare(false);
      } else {
        // 失敗アラート
        store.dispatch(
          setAlert({
            isAlert: true,
            numType: ALERT_COM_TYPE.DESCRIPTION,
            message: '解除に失敗しました',
            description: 'お手数ですがお時間を空けて再度お試しください',
            alertType: ALERT_TYPE.ERROR,
          }),
        );
      }
    } else if (shareType === SHARE.CANCEL) {
      console.log('特に何もしない');
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
      placement='top'
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
      onConfirm={() => confirmDialog(SHARE.SAVE)}
      onCancel={() => confirmDialog(SHARE.CANCEL)}
    >
      <Button
        onClick={async () => {
          console.log('共有ボタンクリック');
          if (isShare) {
            console.log('共有を解除');
            // 共有を解除
            console.log('共有を解除 modalを出す');
            setConfirm(true);
          } else {
            console.log('今日にする');
            // shareStatusを1に更新
            const response = await updateShare(SHARE.SAVE);
            if (response && response.ok) {
              // 更新成功アラート
              store.dispatch(
                setAlert({
                  isAlert: true,
                  numType: ALERT_COM_TYPE.SIMPLE,
                  message: '共有しました！',
                  alertType: ALERT_TYPE.SUCCESS,
                }),
              );
              setShare(true);
            } else {
              // 更新失敗アラート
              store.dispatch(
                setAlert({
                  isAlert: true,
                  numType: ALERT_COM_TYPE.DESCRIPTION,
                  message: '共有に失敗しました',
                  description: 'お手数ですがお時間を空けて再度お試しください',
                  alertType: ALERT_TYPE.ERROR,
                }),
              );
            }
          }
        }}
      >
        {isWait ? (
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
        ) : isShare ? (
          '解除'
        ) : (
          '共有'
        )}
      </Button>
    </Popconfirm>
  );
}
