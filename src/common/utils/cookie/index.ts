import { COOKIE_NAME } from '@/common/constants';
import { getCookie } from './manageCookies';

// 選択しているメニュー番号を取得
export async function getSelectedKey() {
  let key;
  key = await getCookie(COOKIE_NAME.SELECTED_MENU);
  if (!key) {
    key = 0;
  }

  return Number(key);
}
