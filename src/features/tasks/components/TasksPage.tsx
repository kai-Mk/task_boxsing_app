"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import Toast from "@/components/ui/Toast";
import { useTasks } from "../hooks/useTasks";
import DatePicker from "./DatePicker";
import TaskList from "./TaskList";
import TimelineView from "./TimelineView";
import TaskFormModal from "./modal/TaskFormModal";
import TaskDetailModal from "./modal/TaskDetailModal";

type Props = {
  initialTasks: Task[];
  initialDate: Date;
  teamId: string;
};

const TasksPage = ({ initialTasks, initialDate, teamId }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
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
  } = useTasks(teamId, initialTasks, initialDate);

  // タスククリック（詳細モーダル表示）
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  // 詳細モーダルを閉じる
  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  // タスク編集モーダルを開く
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  // タスク更新
  const handleUpdateTask = async (
    formData: Parameters<typeof updateTask>[1]
  ) => {
    if (!editingTask) return;
    const success = await updateTask(editingTask.id, formData);
    if (success) {
      setEditingTask(null);
    }
  };

  // タスク削除
  const handleDeleteTask = async (task: Task) => {
    const success = await deleteTask(task.id);
    if (success) {
      setSelectedTask(null);
    }
  };

  // タスク追加
  const handleAddTask = async (formData: Parameters<typeof addTask>[0]) => {
    const success = await addTask(formData);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 日付選択 */}
      <div className="mb-6">
        <DatePicker date={selectedDate} onDateChange={changeDate} />
      </div>

      {/* 2カラムレイアウト */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* 左カラム: タスクリスト */}
        <div className="bg-gray-50 rounded-xl p-4 overflow-hidden flex flex-col">
          <TaskList
            tasks={tasks}
            onToggleStatus={toggleStatus}
            onTaskClick={handleTaskClick}
            onAddClick={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* 右カラム: タイムライン */}
        <div className="bg-gray-50 rounded-xl p-4 overflow-hidden flex flex-col">
          <TimelineView tasks={tasks} onTaskClick={handleTaskClick} />
        </div>
      </div>

      {/* タスク追加モーダル */}
      <TaskFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
        isSubmitting={isLoading}
      />

      {/* タスク編集モーダル */}
      <TaskFormModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        isSubmitting={isLoading}
        initialData={editingTask ?? undefined}
      />

      {/* タスク詳細モーダル */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={selectedTask !== null}
        onClose={handleCloseDetail}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

export default TasksPage;
