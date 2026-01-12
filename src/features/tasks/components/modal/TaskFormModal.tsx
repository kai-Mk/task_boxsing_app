"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import TimePicker from "@/components/ui/TimePicker";
import RadioGroup from "@/components/ui/RadioGroup";
import ColorPicker from "@/components/ui/ColorPicker";
import Button from "@/components/ui/Button";
import { TaskFormData } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TaskFormData) => void;
  isSubmitting?: boolean;
};

const TYPE_OPTIONS = [
  { value: "WORK", label: "作業" },
  { value: "BREAK", label: "休憩" },
];

const MTG_OPTIONS = [
  { value: "AVAILABLE", label: "対応可能" },
  { value: "CHAT_ONLY", label: "チャットのみ" },
  { value: "UNAVAILABLE", label: "対応不可" },
];

const TaskFormModal = ({ isOpen, onClose, onSubmit, isSubmitting = false }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      type: "WORK",
      mtgAvailability: "AVAILABLE",
      description: "",
      color: "BLUE",
    },
  });

  // モーダルが閉じた時にフォームをリセット
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit?.(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="タスクを追加" size="md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* タイトル */}
        <Input
          label="タイトル"
          type="text"
          register={register("title", { required: "タイトルを入力してください" })}
          error={errors.title?.message}
          required
        />

        {/* 時間 */}
        <div className="grid grid-cols-2 gap-4">
          <TimePicker
            label="開始時刻"
            register={register("startTime")}
            error={errors.startTime?.message}
            required
          />
          <TimePicker
            label="終了時刻"
            register={register("endTime")}
            error={errors.endTime?.message}
            required
          />
        </div>

        {/* タイプ */}
        <RadioGroup
          label="タイプ"
          name="type"
          options={TYPE_OPTIONS}
          register={register("type")}
          error={errors.type?.message}
        />

        {/* ミーティング可否 */}
        <RadioGroup
          label="ミーティング可否"
          name="mtgAvailability"
          options={MTG_OPTIONS}
          register={register("mtgAvailability")}
          error={errors.mtgAvailability?.message}
        />

        {/* 色選択 */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              label="色"
              value={field.value ?? "BLUE"}
              onChange={field.onChange}
              error={errors.color?.message}
            />
          )}
        />

        {/* 説明 */}
        <TextArea
          label="説明"
          hint="（任意）"
          register={register("description")}
          error={errors.description?.message}
          rows={3}
        />

        {/* ボタン */}
        <div className="flex gap-3 justify-end pt-2">
          <Button
            label="キャンセル"
            variant="secondary"
            fullWidth={false}
            onClick={handleClose}
          />
          <Button
            label="追加"
            type="submit"
            fullWidth={false}
            loading={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
