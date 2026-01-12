import { useState, useCallback } from "react";
import { Task } from "@prisma/client";
import { taskService } from "../services/taskService";
import { TaskFormData } from "../types";
import { sortTasks } from "@/lib/utils/task";

type ToastState = {
  message: string;
  type: "success" | "error";
} | null;

type UseTasksReturn = {
  tasks: Task[];
  selectedDate: Date;
  isLoading: boolean;
  toast: ToastState;
  changeDate: (date: Date) => Promise<void>;
  addTask: (formData: TaskFormData) => Promise<boolean>;
  updateTask: (taskId: string, formData: TaskFormData) => Promise<boolean>;
  toggleStatus: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<boolean>;
  clearToast: () => void;
};

export const useTasks = (
  teamId: string,
  initialTasks: Task[],
  initialDate: Date
): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  // 日付変更
  const changeDate = useCallback(
    async (date: Date) => {
      setSelectedDate(date);
      setIsLoading(true);

      try {
        const result = await taskService.getByDate(teamId, date);

        if (!result.success) {
          setToast({ message: result.message, type: "error" });
          return;
        }

        setTasks(result.data);
      } catch (error) {
        console.error("タスク取得エラー:", error);
        setToast({ message: "タスクの取得に失敗しました", type: "error" });
      } finally {
        setIsLoading(false);
      }
    },
    [teamId]
  );

  // タスク追加
  const addTask = useCallback(
    async (formData: TaskFormData): Promise<boolean> => {
      setIsLoading(true);

      try {
        const result = await taskService.create(teamId, formData, selectedDate);

        if (!result.success) {
          setToast({ message: result.message, type: "error" });
          return false;
        }

        setTasks(prev => sortTasks([...prev, result.data]));
        setToast({ message: "タスクを追加しました", type: "success" });
        return true;
      } catch (error) {
        console.error("タスク作成エラー:", error);
        setToast({ message: "タスクの作成に失敗しました", type: "error" });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [teamId, selectedDate]
  );

  // タスク更新
  const updateTask = useCallback(
    async (taskId: string, formData: TaskFormData): Promise<boolean> => {
      setIsLoading(true);

      try {
        const result = await taskService.update(teamId, taskId, formData);

        if (!result.success) {
          setToast({ message: result.message, type: "error" });
          return false;
        }

        setTasks(prev =>
          sortTasks(prev.map(task => (task.id === taskId ? result.data : task)))
        );
        setToast({ message: "タスクを更新しました", type: "success" });
        return true;
      } catch (error) {
        console.error("タスク更新エラー:", error);
        setToast({ message: "タスクの更新に失敗しました", type: "error" });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [teamId]
  );

  // ステータストグル（楽観的更新 + API連携）
  const toggleStatus = useCallback(
    async (taskId: string) => {
      const targetTask = tasks.find(task => task.id === taskId);
      if (!targetTask) return;

      const newStatus = targetTask.status === "TODO" ? "DONE" : "TODO";
      const prevTasks = tasks;

      // 楽観的更新
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // API呼び出し
      try {
        const result = await taskService.updateStatus(
          teamId,
          taskId,
          newStatus
        );
        if (!result.success) {
          setTasks(prevTasks);
          setToast({
            message: "ステータスの更新に失敗しました",
            type: "error",
          });
        }
      } catch (error) {
        console.error("ステータス更新エラー:", error);
        setTasks(prevTasks);
        setToast({ message: "ステータスの更新に失敗しました", type: "error" });
      }
    },
    [teamId, tasks]
  );

  // タスク削除
  const deleteTask = useCallback(
    async (taskId: string): Promise<boolean> => {
      setIsLoading(true);

      try {
        const result = await taskService.delete(teamId, taskId);

        if (!result.success) {
          setToast({ message: result.message, type: "error" });
          return false;
        }

        setTasks(prev => prev.filter(task => task.id !== taskId));
        setToast({ message: "タスクを削除しました", type: "success" });
        return true;
      } catch (error) {
        console.error("タスク削除エラー:", error);
        setToast({ message: "タスクの削除に失敗しました", type: "error" });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [teamId]
  );

  // Toast消去
  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    tasks,
    selectedDate,
    isLoading,
    toast,
    changeDate,
    addTask,
    updateTask,
    toggleStatus,
    deleteTask,
    clearToast,
  };
};
