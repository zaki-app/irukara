'use server';

import createUserIdHash from '@/common/libs/createHash';
import { setCookie } from '@/common/utils/authLINE/manageCookies';
import type { UserProfile } from '@/common/types/LineTypes';
import { cookies } from 'next/headers';

/**
 * cookiesに保存しているトークンからユーザー情報を取得する
 * userIdはハッシュ化してクッキーに保存
 * @returns UserProfile
 */
export default async function getProfile(): Promise<UserProfile> {
  const token = cookies().get('irukara');
  console.log('irukaraのトークン', token?.value);
  let data;
  try {
    const PROFILE_URL = process.env.LINE_USER_PROFILE_URL ?? '';
    const response = await fetch(PROFILE_URL, {
      headers: { Authorization: `Bearer ${token?.value}` },
    });
    if (response.status === 200) {
      const profile = await response.json();
      console.log('プロフィール', profile);
      const hashUserId = createUserIdHash(profile.userId);
      console.log('ハッシュ化した', hashUserId);
      const testHash = createUserIdHash(hashUserId);
      console.log('2回目のハッシュ', testHash);
      setCookie('irukaraId', hashUserId);
      // 返却オブジェクトからuserIdを削除
      delete profile.userId;
      data = profile;
    }
  } catch (err) {
    console.error('get profile error...', err);
  }
  return data;
}
