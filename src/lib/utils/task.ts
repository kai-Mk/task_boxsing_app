import { Task } from "@prisma/client";

/**
 * タスクを開始時間とIDでソート
 * バックエンドのソート順と一致させる
 */
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    if (a.startTime !== b.startTime) {
      return a.startTime - b.startTime;
    }
    return a.id.localeCompare(b.id);
  });
};
