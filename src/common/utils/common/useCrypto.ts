import crypto from 'crypto';

/* 一意の値を生成 */
export function generateFileName(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}
