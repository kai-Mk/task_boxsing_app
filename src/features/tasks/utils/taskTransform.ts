import { TaskColor, TaskType, MtgAvailability } from "@prisma/client";
import { timeToMinutes } from "@/lib/utils/date";
import { TaskFormData } from "../types";

export type CreateTaskPayload = {
  date: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  type: TaskType;
  color: TaskColor;
  mtgAvailability: MtgAvailability;
};

/**
 * フォームデータをAPI送信用のペイロードに変換
 */
export const toCreateTaskPayload = (
  formData: TaskFormData,
  date: Date
): CreateTaskPayload => {
  return {
    date: date.toISOString(),
    title: formData.title,
    description: formData.description || "",
    startTime: timeToMinutes(formData.startTime),
    endTime: timeToMinutes(formData.endTime),
    type: formData.type,
    color: formData.color,
    mtgAvailability: formData.mtgAvailability,
  };
};
