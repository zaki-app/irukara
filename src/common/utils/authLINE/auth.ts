import Tokens from 'csrf';
import crypto from 'crypto';

// トークンを生成
function createToken(): string {
  const tokens = new Tokens();
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  return token;
}

// nonceを生成
function createNonce(): string {
  const nonce = crypto.randomBytes(16).toString('base64');
  console.log('何す', nonce);
  return nonce;
}

// LINEログイン
export default async function authLINE() {
  console.log('LINEログインを開始');
  const clientID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID ?? '';
  const callback = process.env.NEXT_PUBLIC_LINE_CALL_BACK ?? '';
  const authURL = 'https://access.line.me/oauth2/v2.1/';
  const pathParams = `authorize?response_type=code&client_id=${clientID}`;
  const redirectURL = `&redirect_uri=${callback}`;
  const state = `&state=${createToken()}`;
  const scope = `&scope=profile%20openid`;
  const nonce = `&nonce=${createNonce()}`;

  console.log('環境変数', clientID);

  const response = await fetch(
    `${authURL}${pathParams}${redirectURL}${state}${scope}${nonce}`,
  );

  console.log('レスポンス', response);
}

// next-authでのLINEログイン
/** リクエストurl */
// https://access.line.me/oauth2/v2.1/authorize/consent?client_id=1660897581&scope=openid+profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fline&state=6_GFXvmOB3sYu7gQu-W1n3e2mZFemfSJqC9kEtVmoFU

// state=
// 6_GFXvmOB3sYu7gQu-W1n3e2mZFemfSJqC9kEtVmoFU
// 3mBiU9Hz-Njb-YlelIUNI3ZfWrBrelESImlw
// openid+profile
