import { DateTime } from "luxon";

/**
 * 日本時間の今日の日付をUTCで取得
 */
export const getTodayUTC = (): Date => {
  return DateTime.now()
    .setZone("Asia/Tokyo")
    .startOf("day")
    .toUTC()
    .toJSDate();
};
