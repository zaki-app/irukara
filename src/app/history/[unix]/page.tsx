import { COOKIE_NAME, SELECT_MODE } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import CautionText from '@/components/client/atoms/login/CautionText';
import HistoryData from '@/components/client/molecules/HistoryData';
import Sidebar from '@/components/client/molecules/login/Sidebar';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';

/**
 * 過去のデータを表示するコンポーネント
 * @param pathParameter type(0...3.5, 2...イラスト), start, end
 * @returns
 */
export default async function historyData({
  params,
}: {
  params: { unix: string };
}) {
  const splintParams = params.unix.split('and');
  const type = Number(splintParams[0]);
  const start = splintParams[1];
  const end = splintParams[2];

  // apiに必要な情報
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);

  console.log('pages params', type, start, end);
  let path;
  if (type === SELECT_MODE.GPT3) {
    path = IRUKARA_API.GET_MSG_DATE.replace('{userId}', userId)
      .replace('{startUnix}', start)
      .replace('{endUnix}', end);
  } else if (type === SELECT_MODE.ILLUST) {
    path = IRUKARA_API.GET_IMAGES.replace('{userId}', userId)
      .replace('{startUnix}', start)
      .replace('{endUnix}', end)
      .replace('{imageType}', '1');
  } else if (type === SELECT_MODE.REAL) {
    path = IRUKARA_API.GET_IMAGES.replace('{userId}', userId)
      .replace('{startUnix}', start)
      .replace('{endUnix}', end)
      .replace('{imageType}', '2');
  }
  console.log('パスは？', path);

  const data = await getApi(path as string);
  console.log('レスポンスは', data);

  return (
    <div className='relative z-0 flex h-full w-full overflow-hidden'>
      {/* <Sidebar /> */}
      <PrimaryWrapper type={1}>
        <HistoryData data={data} type={type} />
      </PrimaryWrapper>
      <CautionText />
    </div>
  );
}
