import { ALERT_COM_TYPE } from '@/common/constants';
import { RootState, store } from '@/store';
import { clearAlert } from '@/store/ui/alert/slice';
import { Alert } from 'antd';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

/**
 * antdのアラートを表示するコンポーネント
 * @remark reduxの値でレンダリングするコンポーネントを分ける
 */
export default function AlertIcon() {
  const { isAlert, message, alertType, description, numType } = useSelector(
    (state: RootState) => state.alertSlice,
  );

  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let time;
    if (numType === ALERT_COM_TYPE.SIMPLE) {
      time = 3000;
    } else if (numType === ALERT_COM_TYPE.DESCRIPTION) {
      time = 10000;
    }
    const timeoutId = setTimeout(() => {
      store.dispatch(clearAlert());
    }, time);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAlert]);

  return (
    <>
      {/* １行のシンプルアラート */}
      {isAlert && numType === ALERT_COM_TYPE.SIMPLE && (
        <CSSTransition
          in={isAlert}
          nodeRef={alertRef}
          timeout={200}
          classNames={{
            enter: 'alert-enter',
            enterActive: 'alert-enter-active',
            exit: 'alert-exit',
            exitActive: 'alert-exit-active',
          }}
        >
          <div className='relative w-full h-full'>
            <div
              className='absolute top-[6rem] right-[1rem] z-[20]'
              ref={alertRef}
            >
              <Alert message={message} type={alertType} showIcon />
            </div>
          </div>
        </CSSTransition>
      )}
      {/* 説明付きのアラート */}
      {isAlert && numType === ALERT_COM_TYPE.DESCRIPTION && (
        <CSSTransition
          in={isAlert}
          nodeRef={alertRef}
          timeout={200}
          classNames={{
            enter: 'alert-enter',
            enterActive: 'alert-enter-active',
            exit: 'alert-exit',
            exitActive: 'alert-exit-active',
          }}
        >
          <div className='relative w-full h-full'>
            <div
              className='absolute top-[6rem] right-[1rem] z-[20]'
              ref={alertRef}
            >
              <Alert
                message={message}
                description={description}
                type={alertType}
                showIcon
                closable
              />
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
}
