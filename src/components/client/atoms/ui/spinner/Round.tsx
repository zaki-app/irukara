import { RootState } from '@/store';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

export default function RoundSpinner() {
  const { isSpinner } = useSelector((state: RootState) => state.spinnerSlice);
  return (
    <>
      {isSpinner && (
        <div className='fixed w-screen h-screen left-0 bg-white z-[50] overflow-hidden flex justify-center items-center'>
          <Spin />
        </div>
      )}
    </>
  );
}
