import { SELECT_MODE } from '@/common/constants';
import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';
import AiCard from '@/components/client/atoms/login/chat/AiCard';
import UserCard from '@/components/client/atoms/login/chat/UserCard';
import Sidebar from '@/components/client/molecules/login/Sidebar';
import PrimaryWrapper from '@/components/client/template/PrimaryWrapper';
import ShareServerTmp from '@/components/server/ShareServerTmp';
import { MessageType } from '@/types/message';

/**
 * chatGpt3.5の詳細画面
 * @remark /{messageId}and{createdAt}でアクセスされる
 * @param params {messageId} 詳細に表示するメッセージID
 * @returns
 */
export default async function ChatInteraction({
  params,
}: {
  params: { messageId: string };
}) {
  let resData;
  let isRes = false;

  try {
    const splintParams = params.messageId.split('and');
    const messageId = splintParams[0];
    const createdAt = splintParams[1];

    const path = IRUKARA_API.GET_MSG_ID.replace(
      '{messageId}',
      messageId,
    ).replace('{createdAt}', createdAt);
    const { data }: { data: MessageType } = await getApi(path);
    resData = data;
    isRes = true;
  } catch (err) {
    console.error('interaction c error...', err);
    isRes = false;
  }

  return (
    <PrimaryWrapper type={3} isScroll>
      {/* chatGpt3.5のやり取り詳細 */}
      <>
        {resData ? (
          <div className='mb-6'>
            <UserCard
              question={resData.question}
              createdAt={resData.createdAt}
            />
            <AiCard
              answer={resData.answer}
              createdAt={resData.createdAt}
              messageId={resData.messageId}
              shareStatus={resData.shareStatus}
              isShareButton
            />
          </div>
        ) : (
          'データを取得できませんでした'
        )}
      </>
      {/* shareエリア */}
      <div className='border-t-2'>
        <ShareServerTmp type={SELECT_MODE.GPT3} />
      </div>
    </PrimaryWrapper>
  );
}
