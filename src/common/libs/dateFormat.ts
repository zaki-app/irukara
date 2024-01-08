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
  const nowUnix = dayjs().startOf('day').unix();
  if (nowUnix < time) {
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

/* 現在のunix時間を取得 */
export function currentUnix() {
  return dayjs().unix();
}

/* 指定した日の0:00〜23:59のunix時間を返す */
export function startEndUnix(daysAgo: number) {
  const start = dayjs().subtract(daysAgo, 'day').startOf('day').unix();
  const end = dayjs().subtract(daysAgo, 'day').endOf('day').unix();

  return { start, end };
}

/* 今日からn日前の日付と開始終了のunix時間を返却 */
export function returnSevenDays() {
  const today = dayjs().tz();

  const response = [];
  for (let i = 1; i <= 7; i += 1) {
    const pastDate = today.subtract(i, 'day');
    const formatDate = pastDate.format('M月D日');
    const { start, end } = startEndUnix(i);

    const params = {
      key: i,
      day: formatDate,
      start,
      end,
    };
    response.push(params);
  }

  console.log('1週間', response);

  return response;
}

/* 今日の日付と開始終了のunix時間を返却 */
export function returnToday() {
  const today = dayjs().tz();

  const pastDate = today.subtract(0, 'day');
  const formatDate = pastDate.format('M月D日');
  const { start, end } = startEndUnix(0);

  const params = {
    key: 0,
    day: formatDate,
    start,
    end,
  };

  console.log('今日', params);

  return params;
}
