"use client";

import Modal from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TaskFormData) => void;
};

// TODO: 後でちゃんとした型に置き換え
export type TaskFormData = {
  title: string;
  startTime: number;
  endTime: number;
  type: "WORK" | "BREAK";
  mtgAvailability: "AVAILABLE" | "CHAT_ONLY" | "UNAVAILABLE";
  description?: string;
  color: string;
};

const TaskFormModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: フォームデータを収集してonSubmitを呼ぶ
    console.log("Form submitted");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="タスクを追加" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* タイトル */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="タスク名を入力"
          />
        </div>

        {/* 時間 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              開始時刻
            </label>
            <input
              type="time"
              step="900"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              終了時刻
            </label>
            <input
              type="time"
              step="900"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* タイプ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイプ
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="WORK"
                defaultChecked
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">作業</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="BREAK"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">休憩</span>
            </label>
          </div>
        </div>

        {/* ミーティング可否 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ミーティング可否
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="AVAILABLE">対応可能</option>
            <option value="CHAT_ONLY">チャットのみ</option>
            <option value="UNAVAILABLE">対応不可</option>
          </select>
        </div>

        {/* 説明 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            説明（任意）
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="タスクの詳細を入力"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            追加
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
