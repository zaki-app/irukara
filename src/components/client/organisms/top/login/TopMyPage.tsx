import GenerateArea from '@/components/client/molecules/auth/GenerateArea';
import UserStatus from '@/components/client/molecules/auth/UserStatus';
import PageWrapper from '@/components/client/template/PageWrapper';

/**
 * 他のユーザーの投稿を見れる
 * @param session
 * @returns
 */
export default async function TopMyPage() {
  // const response = await getUserId();

  return (
    <PageWrapper>
      {/* 上にプラン情報 */}
      <UserStatus />
      {/* チャット・画像生成エリア */}
      <GenerateArea />
    </PageWrapper>
  );
}
