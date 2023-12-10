import { ERROR_MSG } from '../error/message';

export function commonValidate(text: string, max: number) {
  // scriptが入力された場合
  const scriptRegex = /^<script\b[^>]*>/i;
  if (scriptRegex.test(text)) {
    return {
      result: true,
      text: ERROR_MSG.INPUT_INVALID,
    };
  }

  // 文字数制限
  if (text.length > max) {
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
