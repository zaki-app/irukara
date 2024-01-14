import { CALLBACK } from '@/common/constants/path';
import { allDeleteCookies } from '@/common/utils/cookie/manageCookies';
import { signOut } from 'next-auth/react';

/**
 * サインアウト
 */
export async function authSignOut() {
  await signOut({ callbackUrl: CALLBACK.LOGOUT_URL });
  await allDeleteCookies();
}
