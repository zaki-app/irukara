/** UNIX時間を変換する */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/TOKYO');

export default function dateFormat(time: number) {
  const date = dayjs(time * 1000)
    .tz()
    .format('YYYY年MM月DD日 HH:mm');

  return date;
}
