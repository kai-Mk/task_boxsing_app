"use client";

import { Task } from "@prisma/client";
import { Check } from "lucide-react";
import { minutesToTime } from "@/lib/utils/date";
import { getColorClass } from "../utils/taskList";
import MtgBadge from "./MtgBadge";

type Props = {
  task: Task;
  onToggleStatus?: (taskId: string) => void;
  onClick?: (task: Task) => void;
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
          shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center
          transition
          ${
            isDone
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
            {minutesToTime(task.startTime)} - {minutesToTime(task.endTime)}
          </span>
          <MtgBadge availability={task.mtgAvailability} size="sm" />
        </div>
      </div>

      {/* カラーインジケーター */}
      <div
        className={`
          shrink-0 w-2 h-full min-h-10 rounded-full
          ${getColorClass(task.color)}
        `}
      />
    </div>
  );
};

export default TaskListItem;
