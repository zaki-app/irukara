import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/libs/api/lambda/requestClient';

export default async function ChatInteraction({
  params,
}: {
  params: { messageId: string };
}) {
  let resData;
  let isRes = false;

  try {
    console.log('パラメータ', params);
    const splintParams = params.messageId.split('and');
    const messageId = splintParams[0];
    const createdAt = splintParams[1];

    console.log('分割しました', messageId, createdAt);

    const path = IRUKARA_API.GET_MSG_ID.replace(
      '{messageId}',
      messageId,
    ).replace('{createdAt}', createdAt);
    console.log('パスは？', path);
    const { data } = await getApi(path);
    console.log('詳細レスポンス', data);
    resData = data;
    isRes = true;
  } catch (err) {
    console.error('interaction c error...', err);
    isRes = false;
  }

  return (
    <section>
      {isRes ? (
        <div>
          <h2>{resData.question}</h2>
          <p>{resData.answer}</p>
        </div>
      ) : (
        'データを取得できませんでした'
      )}
    </section>
  );
}
