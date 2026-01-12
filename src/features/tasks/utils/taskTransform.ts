import { TaskColor, TaskType, MtgAvailability } from "@prisma/client";
import { timeToMinutes } from "@/lib/utils/date";
import { TaskFormData } from "../types";

export type TaskPayload = {
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  type: TaskType;
  color: TaskColor;
  mtgAvailability: MtgAvailability;
};

export type CreateTaskPayload = TaskPayload & { date: string };

/**
 * フォームデータをAPI送信用のペイロードに変換
 */
export const toTaskPayload = (formData: TaskFormData, date?: Date) => {
  const payload: TaskPayload = {
    title: formData.title,
    description: formData.description || "",
    startTime: timeToMinutes(formData.startTime),
    endTime: timeToMinutes(formData.endTime),
    type: formData.type,
    color: formData.color,
    mtgAvailability: formData.mtgAvailability,
  };

  if (date) {
    return { ...payload, date: date.toISOString() };
  }
  return payload;
};
