import CautionText from '@/components/client/atoms/login/CautionText';
import Sidebar from '@/components/client/molecules/login/Sidebar';
import { usePathname } from 'next/navigation';

export default async function historyData({
  params,
}: {
  params: { unix: string };
}) {
  const splintParams = params.unix.split('and');
  console.log('これは？', splintParams);
  const type = Number(splintParams[0]);
  const start = Number(splintParams[1]);
  const end = Number(splintParams[2]);

  async function getHistroyData() {
    if (type === 0 || type === 1) {
      // chatデータを取得
    } else if (type === 2 || type === 2) {
      // 画像データを取得
    }
  }

  return (
    <div className='relative z-0 flex h-full w-full overflow-hidden'>
      <Sidebar />
      <CautionText />
    </div>
  );
}
