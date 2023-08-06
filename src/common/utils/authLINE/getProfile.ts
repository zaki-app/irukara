'use server';

import createUserIdHash from '@/common/libs/createHash';
import { setCookie } from '@/common/utils/authLINE/manageCookies';
import type { UserProfile } from '@/common/types/LineTypes';
import { cookies } from 'next/headers';
import logColor from '@/common/config/logColor';

/**
 * cookiesに保存しているトークンからユーザー情報を取得する
 * userIdはハッシュ化してクッキーに保存
 * @returns UserProfile
 */
export default async function getProfile(): Promise<UserProfile> {
  const token = cookies().get('irukaraAT');
  console.log('irukaraのトークン', token?.value);
  let data;
  try {
    const PROFILE_URL = process.env.LINE_USER_PROFILE_URL ?? '';
    const response = await fetch(PROFILE_URL, {
      headers: { Authorization: `Bearer ${token?.value}` },
    });
    if (response.status === 200) {
      const profile = await response.json();
      console.log(`${logColor.green}プロフィール${logColor.reset}`, profile);
      const hashUserId = createUserIdHash(profile.userId);
      setCookie('irukaraId', hashUserId);
      // 返却オブジェクトからuserIdを削除
      delete profile.userId;
      data = profile;
    }
  } catch (err) {
    console.error('get profile error...', err);
  }
  console.log(`${logColor.green}finally profile...${logColor.reset}`, data);
  return data;
}
