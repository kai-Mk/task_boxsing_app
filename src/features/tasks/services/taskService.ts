import { Task } from "@prisma/client";
import { apiClient } from "@/lib/api-client";
import { TaskFormData } from "../types";
import { toCreateTaskPayload } from "../utils/taskTransform";

/**
 * タスク関連のAPIクライアント
 */
export const taskService = {
  /**
   * 指定日のタスク一覧を取得
   */
  getByDate: async (teamId: string, date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return apiClient.get<Task[]>(`/api/teams/${teamId}/tasks?date=${dateStr}`);
  },

  /**
   * タスクを作成
   */
  create: async (teamId: string, formData: TaskFormData, date: Date) => {
    const payload = toCreateTaskPayload(formData, date);
    return apiClient.post<Task>(`/api/teams/${teamId}/tasks`, payload);
  },

  /**
   * タスクのステータスを更新
   */
  updateStatus: async (
    teamId: string,
    taskId: string,
    status: "TODO" | "DONE"
  ) => {
    return apiClient.post<Task>(`/api/teams/${teamId}/tasks/${taskId}/status`, {
      status,
    });
  },

  /**
   * タスクを削除
   */
  delete: async (teamId: string, taskId: string) => {
    return apiClient.delete<Task>(`/api/teams/${teamId}/tasks/${taskId}`);
  },
};
