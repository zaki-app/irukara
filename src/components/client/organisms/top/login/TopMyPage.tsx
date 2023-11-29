import { getUserId } from '@/common/libs/api';
import UserStatus from '@/components/client/molecules/UserStatus';
import PageWrapper from '@/components/client/template/PageWrapper';
import { GetUserIdRes } from '@/types/auth/api';

/**
 * 他のユーザーの投稿を見れる
 * @param session
 * @returns
 */
export default async function TopMyPage() {
  const response = await getUserId();

  return (
    <PageWrapper>
      {/* 上にプラン情報 */}
      <UserStatus userData={response} />
      {/*  */}
    </PageWrapper>
  );
}
