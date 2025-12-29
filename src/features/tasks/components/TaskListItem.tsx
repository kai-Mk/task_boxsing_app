"use client";

import { Task, MtgAvailability } from "@prisma/client";
import { Check } from "lucide-react";
import MtgBadge from "./MtgBadge";

type Props = {
  task: Task;
  onToggleStatus?: (taskId: string) => void;
  onClick?: (task: Task) => void;
};

// 分を "HH:mm" 形式に変換
const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

const TaskListItem = ({ task, onToggleStatus, onClick }: Props) => {
  const isDone = task.status === "DONE";
  const isBreak = task.type === "BREAK";

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStatus?.(task.id);
  };

  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        flex items-start gap-3 p-3 rounded-lg border cursor-pointer
        transition hover:shadow-sm
        ${isDone ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 hover:border-gray-300"}
      `}
    >
      {/* チェックボックス */}
      <button
        onClick={handleCheckboxClick}
        className={`
          flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center
          transition
          ${isDone
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        {isDone && <Check className="w-3 h-3" />}
      </button>

      {/* タスク情報 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`
              font-medium truncate
              ${isDone ? "text-gray-400 line-through" : "text-gray-800"}
            `}
          >
            {task.title}
          </span>
          {isBreak && (
            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              休憩
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">
            {formatTime(task.startTime)} - {formatTime(task.endTime)}
          </span>
          {task.mtgAvailability !== MtgAvailability.UNAVAILABLE && (
            <MtgBadge availability={task.mtgAvailability} size="sm" />
          )}
        </div>
      </div>

      {/* カラーインジケーター */}
      <div
        className={`
          flex-shrink-0 w-2 h-full min-h-[40px] rounded-full
          ${getColorClass(task.color)}
        `}
      />
    </div>
  );
};

// TaskColor から Tailwind クラスを取得
const getColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    RED: "bg-red-400",
    ORANGE: "bg-orange-400",
    YELLOW: "bg-yellow-400",
    GREEN: "bg-green-400",
    BLUE: "bg-blue-400",
    PURPLE: "bg-purple-400",
    PINK: "bg-pink-400",
    GRAY: "bg-gray-400",
  };
  return colorMap[color] || "bg-gray-400";
};

export default TaskListItem;
