"use client";

import { Task } from "@prisma/client";
import { Plus } from "lucide-react";
import TaskListItem from "./TaskListItem";

type Props = {
  tasks: Task[];
  onToggleStatus?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
  onAddClick?: () => void;
};

const TaskList = ({
  tasks,
  onToggleStatus,
  onTaskClick,
  onAddClick,
}: Props) => {
  // tasksは既にソート済み前提
  const todoTasks = tasks.filter(t => t.status === "TODO");
  const doneTasks = tasks.filter(t => t.status === "DONE");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">タスク一覧</h2>
        <span className="text-sm text-gray-500">
          {doneTasks.length}/{tasks.length} 完了
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>タスクがありません</p>
            <p className="text-sm mt-1">
              「タスクを追加」ボタンで作成しましょう
            </p>
          </div>
        ) : (
          <>
            {/* 未完了タスク */}
            {todoTasks.map(task => (
              <TaskListItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onClick={onTaskClick}
              />
            ))}

            {/* 完了タスク（あれば区切りを入れる） */}
            {doneTasks.length > 0 && todoTasks.length > 0 && (
              <div className="border-t border-gray-200 my-3" />
            )}
            {doneTasks.map(task => (
              <TaskListItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onClick={onTaskClick}
              />
            ))}
          </>
        )}
      </div>

      {/* 追加ボタン */}
      <button
        onClick={onAddClick}
        className="
          mt-4 flex items-center justify-center gap-2 w-full py-3
          bg-blue-50 text-blue-600 rounded-lg border-2 border-dashed border-blue-200
          hover:bg-blue-100 hover:border-blue-300 transition
          font-medium
        "
      >
        <Plus className="w-5 h-5" />
        タスクを追加
      </button>
    </div>
  );
};

export default TaskList;
