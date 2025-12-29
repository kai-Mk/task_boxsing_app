"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

type Props = {
  startHour: number;
  endHour: number;
  hourHeight: number;
};

const CurrentTimeLine = ({ startHour, endHour, hourHeight }: Props) => {
  const [now, setNow] = useState(DateTime.now());

  // 1分ごとに更新
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(DateTime.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const currentMinutes = now.hour * 60 + now.minute;
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  // タイムライン範囲外なら表示しない
  if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
    return null;
  }

  const topPosition = ((currentMinutes - startMinutes) / 60) * hourHeight;

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{ top: `${topPosition}px` }}
    >
      <div className="flex items-center">
        {/* 時刻表示 */}
        <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded -ml-1">
          {now.toFormat("HH:mm")}
        </span>
        {/* ライン */}
        <div className="flex-1 h-0.5 bg-red-500 ml-1" />
        {/* 右端の丸 */}
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </div>
  );
};

export default CurrentTimeLine;
