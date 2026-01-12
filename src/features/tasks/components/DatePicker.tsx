"use client";

import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { DateTime } from "luxon";
import { isToday } from "@/lib/utils/date";

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

const DatePicker = ({ date, onDateChange }: Props) => {
  const dt = DateTime.fromJSDate(date);
  const isTodaySelected = isToday(date);

  const handlePrev = () => {
    onDateChange(dt.minus({ days: 1 }).toJSDate());
  };

  const handleNext = () => {
    onDateChange(dt.plus({ days: 1 }).toJSDate());
  };

  const handleToday = () => {
    onDateChange(DateTime.now().startOf("day").toJSDate());
  };

  const formatDate = () => {
    const formatted = dt.setLocale("ja").toFormat("yyyy年M月d日（ccc）");
    return formatted;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1.5">
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-gray-100 rounded transition"
          aria-label="前日"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={handleToday}
          className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition min-w-[180px] justify-center"
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-800">{formatDate()}</span>
        </button>

        <button
          onClick={handleNext}
          className="p-1 hover:bg-gray-100 rounded transition"
          aria-label="翌日"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {!isTodaySelected && (
        <button
          onClick={handleToday}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          今日に戻る
        </button>
      )}
    </div>
  );
};

export default DatePicker;
