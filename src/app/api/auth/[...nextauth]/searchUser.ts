import { IRUKARA_API } from '@/common/constants/path';
import { getApi } from '@/common/utils/api';

/**
 * ユーザーIDから検索し、データがなかったら登録
 */
export default async function searchUser(userId: string) {
  // ユーザーを検索
  const userIdParam = IRUKARA_API.GET_USER_ID.replace('{userId}', userId);
  const userData = await getApi(userIdParam);
  console.log('ユーザー情報は？', userData);
}
