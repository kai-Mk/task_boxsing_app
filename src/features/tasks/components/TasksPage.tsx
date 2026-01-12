"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import Toast from "@/components/ui/Toast";
import { useTasks } from "../hooks/useTasks";
import DatePicker from "./DatePicker";
import TaskList from "./TaskList";
import TimelineView from "./TimelineView";
import TaskFormModal from "./TaskFormModal";

type Props = {
  initialTasks: Task[];
  initialDate: Date;
  teamId: string;
};

const TasksPage = ({ initialTasks, initialDate, teamId }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    tasks,
    selectedDate,
    isLoading,
    toast,
    changeDate,
    addTask,
    toggleStatus,
    clearToast,
  } = useTasks(teamId, initialTasks, initialDate);

  // タスククリック（詳細モーダル表示用）
  const handleTaskClick = (task: Task) => {
    console.log("Task clicked:", task);
    // TODO: 詳細モーダルを開く
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

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </div>
  );
};

export default TasksPage;
