import { Task } from "@prisma/client";

export type TaskWithLayout = Task & {
  columnIndex: number;
  totalColumns: number;
};

/**
 * タスクが重なっているかどうかを判定
 */
const isOverlapping = (task1: Task, task2: Task): boolean => {
  return task1.startTime < task2.endTime && task2.startTime < task1.endTime;
};

/**
 * 重なるタスクをグループ化して、列のレイアウトを計算
 */
export const calculateTaskLayout = (tasks: Task[]): TaskWithLayout[] => {
  if (tasks.length === 0) return [];

  // 各タスクのグループIDと列インデックスを追跡
  const taskInfo: Map<string, { groupId: number; columnIndex: number }> =
    new Map();

  // グループごとの最大列数
  const groupMaxColumns: Map<number, number> = new Map();

  let currentGroupId = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // 重なるタスクを見つける
    const overlappingTasks: Task[] = [];
    for (let j = 0; j < i; j++) {
      if (isOverlapping(task, tasks[j])) {
        overlappingTasks.push(tasks[j]);
      }
    }

    if (overlappingTasks.length === 0) {
      // 重なるタスクがない → 新しいグループ
      currentGroupId++;
      taskInfo.set(task.id, { groupId: currentGroupId, columnIndex: 0 });
      groupMaxColumns.set(currentGroupId, 1);
    } else {
      // 重なるタスクがある → 既存のグループに参加
      const overlappingInfo = overlappingTasks.map(t => taskInfo.get(t.id)!);
      const groupId = overlappingInfo[0].groupId;

      // 使われている列を取得
      const usedColumns = new Set(
        overlappingInfo.map(info => info.columnIndex)
      );

      // 空いている最小の列を見つける
      let columnIndex = 0;
      while (usedColumns.has(columnIndex)) {
        columnIndex++;
      }

      taskInfo.set(task.id, { groupId, columnIndex });

      // グループの最大列数を更新
      const currentMax = groupMaxColumns.get(groupId) || 0;
      groupMaxColumns.set(groupId, Math.max(currentMax, columnIndex + 1));
    }
  }

  // 結果を構築
  return tasks.map(task => {
    const info = taskInfo.get(task.id)!;
    const totalColumns = groupMaxColumns.get(info.groupId) || 1;

    return {
      ...task,
      columnIndex: info.columnIndex,
      totalColumns,
    };
  });
};
