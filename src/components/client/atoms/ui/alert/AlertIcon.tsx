import { ALERT_TYPE } from '@/common/constants';
import { RootState } from '@/store';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';

export default function AlertIcon() {
  const { isAlert, message, numAlertType } = useSelector(
    (state: RootState) => state.alertSlice,
  );

  if (isAlert) {
    if (numAlertType === ALERT_TYPE.SUCCESS) {
      return <Alert message={message} type='success' showIcon />;
    }
    if (numAlertType === ALERT_TYPE.ERROR) {
      return <Alert message={message} type='error' showIcon />;
    }
  }
  return <></>;
}
