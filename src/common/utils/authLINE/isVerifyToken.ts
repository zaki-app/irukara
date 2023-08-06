'use server';

/**
 * アクセストークンが有効かを判定する
 * @param token string
 * @returns
 */
export default async function isVerifyToken(token: string) {
  let isToken;
  console.log('有効性の環境変数', process.env.NEXT_PUBLIC_LINE_CLIENT_ID);
  try {
    const VERIFY_URL = process.env.VERIFY_TOKEN_URL ?? '';
    const response = await fetch(VERIFY_URL + token);
    console.log('このレスポンスはどうなる？', response);
    if (response.status === 200) {
      const data = await response.json();
      console.log('有効性JSON', data);
      if (data.client_id === process.env.NEXT_PUBLIC_LINE_CLIENT_ID) {
        isToken = true;
        console.log('token is ok');
      }
    } else {
      isToken = false;
    }
  } catch (err) {
    console.log('token is not verify...', err);
    isToken = false;
  }
  console.log('有効性結果', isToken);
  return isToken;
}
