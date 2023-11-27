import UserStatus from '@/components/client/molecules/UserStatus';
import PageWrapper from '@/components/client/template/PageWrapper';

/**
 * 他のユーザーの投稿を見れる
 * @param session
 * @returns
 */
export default function TopMyPage(session: any) {
  console.log('マイページセッション', session);
  return (
    <PageWrapper>
      {/* 上にプラン情報 */}
      <UserStatus />
      {/*  */}
    </PageWrapper>
  );
}
