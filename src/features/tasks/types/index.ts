import { TaskColor, TaskType, MtgAvailability } from "@prisma/client";

export type TaskFormData = {
  title: string;
  startTime: string;
  endTime: string;
  type: TaskType;
  mtgAvailability: MtgAvailability;
  description?: string;
  color: TaskColor;
};
