"use client";

import { Task, MtgAvailability } from "@prisma/client";
import MtgBadge from "./MtgBadge";

type Props = {
  task: Task;
  startHour: number;
  hourHeight: number;
  onClick?: (task: Task) => void;
};

// TaskColor から Tailwind クラスを取得
const getColorClasses = (color: string, isDone: boolean): string => {
  if (isDone) {
    return "bg-gray-100 border-gray-300 text-gray-400";
  }

  const colorMap: Record<string, string> = {
    RED: "bg-red-50 border-red-300 text-red-800",
    ORANGE: "bg-orange-50 border-orange-300 text-orange-800",
    YELLOW: "bg-yellow-50 border-yellow-300 text-yellow-800",
    GREEN: "bg-green-50 border-green-300 text-green-800",
    BLUE: "bg-blue-50 border-blue-300 text-blue-800",
    PURPLE: "bg-purple-50 border-purple-300 text-purple-800",
    PINK: "bg-pink-50 border-pink-300 text-pink-800",
    GRAY: "bg-gray-50 border-gray-300 text-gray-800",
  };
  return colorMap[color] || colorMap.GRAY;
};

const TimelineBlock = ({ task, startHour, hourHeight, onClick }: Props) => {
  const startMinutes = startHour * 60;
  const topPosition = ((task.startTime - startMinutes) / 60) * hourHeight;
  const height = ((task.endTime - task.startTime) / 60) * hourHeight;

  const isDone = task.status === "DONE";
  const isBreak = task.type === "BREAK";
  const colorClasses = getColorClasses(task.color, isDone);

  // 高さが小さい場合は表示を省略
  const isCompact = height < 50;

  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        absolute left-16 right-2 rounded-lg border-l-4 px-3 py-1.5
        cursor-pointer transition hover:shadow-md overflow-hidden
        ${colorClasses}
        ${isDone ? "opacity-60" : ""}
      `}
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
        minHeight: "24px",
      }}
    >
      <div className="flex items-start justify-between gap-2 h-full">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2">
            <span
              className={`
                font-medium truncate text-sm
                ${isDone ? "line-through" : ""}
              `}
            >
              {task.title}
            </span>
            {isBreak && (
              <span className="text-xs opacity-60 flex-shrink-0">休憩</span>
            )}
          </div>

          {!isCompact && task.description && (
            <p className="text-xs opacity-70 truncate mt-0.5">
              {task.description}
            </p>
          )}
        </div>

        {/* MTGバッジ（UNAVAILABLEは表示しない） */}
        {!isCompact && task.mtgAvailability !== MtgAvailability.UNAVAILABLE && (
          <MtgBadge availability={task.mtgAvailability} size="sm" />
        )}
      </div>
    </div>
  );
};

export default TimelineBlock;
