'use server';

import logColor from '@/common/config/logColor';

/**
 * アクセストークンが有効かを判定する
 * @param token string
 * @returns
 */
export default async function isVerifyToken(token: string) {
  let isToken;
  try {
    const VERIFY_URL = process.env.VERIFY_TOKEN_URL ?? '';
    const response = await fetch(VERIFY_URL + token);
    if (response.status === 200) {
      const data = await response.json();
      // console.log('有効性JSON', data);
      if (data.client_id === process.env.NEXT_PUBLIC_LINE_CLIENT_ID) {
        isToken = true;
        console.log(`${logColor.green}token is ok${logColor.reset}`);
      }
    } else {
      isToken = false;
    }
  } catch (err) {
    console.log(`${logColor.red}token is not verify...`, +logColor.reset, err);
    isToken = false;
  }
  return isToken;
}
