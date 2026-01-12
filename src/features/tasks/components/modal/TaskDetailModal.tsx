"use client";

import { Task } from "@prisma/client";
import { Clock, FileText, Users, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { minutesToTime } from "@/lib/utils/date";
import { getColorClass } from "../../utils/taskList";
import MtgBadge from "../MtgBadge";

type Props = {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

const TYPE_LABELS: Record<string, string> = {
  WORK: "作業",
  BREAK: "休憩",
};

const TaskDetailModal = ({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: Props) => {
  if (!task) return null;

  const handleEdit = () => {
    onEdit?.(task);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(task);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="タスク詳細" size="md">
      <div className="space-y-4">
        {/* タイトル & カラー */}
        <div className="flex items-start gap-3">
          <div
            className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${getColorClass(task.color)}`}
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            <span className="text-sm text-gray-500">
              {TYPE_LABELS[task.type]}
            </span>
          </div>
        </div>

        {/* 時間 */}
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            {minutesToTime(task.startTime)} - {minutesToTime(task.endTime)}
          </span>
        </div>

        {/* MTG可否 */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-600" />
          <MtgBadge availability={task.mtgAvailability} />
        </div>

        {/* 説明 */}
        {task.description && (
          <div className="flex items-start gap-2 text-gray-600">
            <FileText className="w-4 h-4 mt-0.5" />
            <p className="text-sm whitespace-pre-wrap">{task.description}</p>
          </div>
        )}

        {/* ステータス */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">ステータス:</span>
          <span
            className={`text-sm font-medium ${
              task.status === "DONE" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {task.status === "DONE" ? "完了" : "未完了"}
          </span>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            label="削除"
            variant="danger"
            fullWidth={false}
            onClick={handleDelete}
          />
          <Button label="編集" fullWidth={false} onClick={handleEdit} />
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
