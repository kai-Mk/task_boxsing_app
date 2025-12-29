"use client";

import { Task } from "@prisma/client";
import TimelineBlock from "./TimelineBlock";
import CurrentTimeLine from "./CurrentTimeLine";

type Props = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
};

// タイムライン表示設定
const TIMELINE_CONFIG = {
  startHour: 8,   // 8:00 から
  endHour: 22,    // 22:00 まで
  hourHeight: 60, // 1時間あたりの高さ（px）
} as const;

const TimelineView = ({ tasks, onTaskClick }: Props) => {
  const { startHour, endHour, hourHeight } = TIMELINE_CONFIG;
  const totalHours = endHour - startHour;
  const hours = Array.from({ length: totalHours + 1 }, (_, i) => startHour + i);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">タイムライン</h2>

      <div className="flex-1 overflow-y-auto bg-white rounded-lg border border-gray-200">
        <div
          className="relative"
          style={{ height: `${totalHours * hourHeight}px` }}
        >
          {/* 時間軸グリッド */}
          {hours.map((hour, index) => (
            <div
              key={hour}
              className="absolute left-0 right-0 flex items-start"
              style={{ top: `${index * hourHeight}px` }}
            >
              {/* 時刻ラベル */}
              <div className="w-14 pr-2 text-right">
                <span className="text-xs text-gray-400 font-medium">
                  {hour.toString().padStart(2, "0")}:00
                </span>
              </div>
              {/* グリッド線 */}
              <div className="flex-1 border-t border-gray-100" />
            </div>
          ))}

          {/* タスクブロック */}
          {tasks.map((task) => (
            <TimelineBlock
              key={task.id}
              task={task}
              startHour={startHour}
              hourHeight={hourHeight}
              onClick={onTaskClick}
            />
          ))}

          {/* 現在時刻ライン */}
          <CurrentTimeLine
            startHour={startHour}
            endHour={endHour}
            hourHeight={hourHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
