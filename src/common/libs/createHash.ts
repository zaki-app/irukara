import { createHash } from 'crypto';

/**
 * hash値を生成する
 * @param userId {string}
 * @returns
 */
export default function createUserIdHash(userId: string) {
  const userIdHash = createHash('sha256').update(userId).digest('hex');
  return userIdHash;
}
