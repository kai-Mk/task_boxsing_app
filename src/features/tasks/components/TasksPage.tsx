"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 日付変更時（TODO: API呼び出しに置き換え）
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // TODO: 選択した日付のタスクを取得
    console.log("Date changed:", date, "teamId:", teamId);
  };

  // タスクのステータストグル（TODO: API呼び出しに置き換え）
  const handleToggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "TODO" ? "DONE" : "TODO" }
          : task
      )
    );
    // TODO: APIでステータス更新
  };

  // タスククリック（詳細モーダル表示用）
  const handleTaskClick = (task: Task) => {
    console.log("Task clicked:", task);
    // TODO: 詳細モーダルを開く
  };

  // タスク追加ボタン
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 日付選択 */}
      <div className="mb-6">
        <DatePicker date={selectedDate} onDateChange={handleDateChange} />
      </div>

      {/* 2カラムレイアウト */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* 左カラム: タスクリスト */}
        <div className="bg-gray-50 rounded-xl p-4 overflow-hidden flex flex-col">
          <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onTaskClick={handleTaskClick}
            onAddClick={handleAddClick}
          />
        </div>

        {/* 右カラム: タイムライン */}
        <div className="bg-gray-50 rounded-xl p-4 overflow-hidden flex flex-col">
          <TimelineView tasks={tasks} onTaskClick={handleTaskClick} />
        </div>
      </div>

      {/* タスク追加モーダル */}
      <TaskFormModal isOpen={isAddModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TasksPage;
