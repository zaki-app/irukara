import { createHash } from 'crypto';

export default function createUserIdHash(userId: string) {
  const userIdHash = createHash('sha256').update(userId).digest('hex');
  return userIdHash;
}
