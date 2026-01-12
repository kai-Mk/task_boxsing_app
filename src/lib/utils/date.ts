import { DateTime } from "luxon";

/**
 * 日本時間の今日の日付をUTCで取得
 */
export const getTodayUTC = (): Date => {
  return DateTime.now().setZone("Asia/Tokyo").startOf("day").toUTC().toJSDate();
};

/**
 * "HH:mm" 形式の時刻文字列を0時からの分数に変換
 * @example timeToMinutes("09:00") => 540
 */
export const timeToMinutes = (time: string): number => {
  const dt = DateTime.fromFormat(time, "HH:mm");
  return dt.hour * 60 + dt.minute;
};

/**
 * 0時からの分数を "HH:mm" 形式の時刻文字列に変換
 * @example minutesToTime(540) => "09:00"
 */
export const minutesToTime = (minutes: number): string => {
  return DateTime.fromObject({
    hour: Math.floor(minutes / 60),
    minute: minutes % 60,
  }).toFormat("HH:mm");
};

/**
 * 指定した日付が今日かどうかを判定
 */
export const isToday = (date: Date): boolean => {
  return DateTime.fromJSDate(date)
    .setZone("Asia/Tokyo")
    .hasSame(DateTime.now().setZone("Asia/Tokyo"), "day");
};
