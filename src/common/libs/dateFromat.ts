/** UNIX時間を変換する */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/TOKYO');

/* 時間まで */
export function dateTimeFormat(time: number) {
  const date = dayjs(time * 1000)
    .tz()
    .format('YYYY年MM月DD日 HH:mm');

  return date;
}

/* 年月日 */
export function dateFormat(time: number) {
  return dayjs(time * 1000)
    .tz()
    .format('YYYY年MM月DD日');
}

/* 今日の日付の場合は時間、昨日より前は月日 */
export function currentTime(time: number): string {
  let formatAt: string;
  const currentUnix = dayjs().startOf('day').unix();
  if (currentUnix < time) {
    formatAt = dayjs(time * 1000)
      .tz()
      .format('HH:mm');
  } else {
    formatAt = dayjs(time * 1000)
      .tz()
      .format('MM/DD');
  }
  return formatAt;
}
