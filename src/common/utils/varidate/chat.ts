import { ERROR_MSG } from '../error/message';

/** chat関係のバリデーション */
export function validateChat(text: string) {
  // scriptが入力された場合
  const scriptRegex = /^<script\b[^>]*>/i;
  if (scriptRegex.test(text)) {
    return {
      result: true,
      text: ERROR_MSG.INPUT_INVALID,
    };
  }
  // 20文字以上の場合
  if (text.length > 25) {
    return {
      result: true,
      text: ERROR_MSG.INPUT_OVER_TEXT,
    };
  }

  return {
    result: false,
    text: '',
  };
}
