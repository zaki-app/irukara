/** chat関係のバリデーション */
export function validateChat(text: string) {
  // scriptが入力された場合
  const scriptRegex = /^<script\b[^>]*>/i;
  if (scriptRegex.test(text)) {
    console.log('scriptなので何もしない');
    return {
      result: true,
      text: '無効な入力です',
    };
  }
  // 20文字以上の場合
  if (text.length > 25) {
    return {
      result: true,
      text: 'お試しの質問は25文字までです',
    };
  }

  return {
    result: false,
    text: '',
  };
}
