import { z } from "zod";

const TaskTypeEnum = z.enum(["WORK", "BREAK"]);
const TaskColorEnum = z.enum([
  "RED",
  "ORANGE",
  "YELLOW",
  "GREEN",
  "BLUE",
  "PURPLE",
  "PINK",
  "GRAY",
]);
const MtgAvailabilityEnum = z.enum(["AVAILABLE", "CHAT_ONLY", "UNAVAILABLE"]);

export const createTaskSchema = z
  .object({
    date: z.coerce.date(),
    title: z
      .string()
      .min(1, "タスク名を入力してください")
      .max(100, "タスク名は100文字以内で入力してください"),
    description: z
      .string()
      .max(300, "詳細は300文字以内で入力してください")
      .optional()
      .or(z.literal("")),
    startTime: z
      .number()
      .min(0, "開始時間が不正です")
      .max(1439, "開始時間が不正です")
      .refine(v => v % 15 === 0, "15分単位で入力してください"),
    endTime: z
      .number()
      .min(0, "終了時間が不正です")
      .max(1440, "終了時間が不正です")
      .refine(v => v % 15 === 0, "15分単位で入力してください"),
    type: TaskTypeEnum,
    color: TaskColorEnum,
    mtgAvailability: MtgAvailabilityEnum,
  })
  .refine(data => data.startTime < data.endTime, {
    message: "終了時間は開始時間より後にしてください",
    path: ["endTime"],
  });

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "タスク名を入力してください")
      .max(100, "タスク名は100文字以内で入力してください"),
    description: z
      .string()
      .max(300, "詳細は300文字以内で入力してください")
      .optional()
      .or(z.literal("")),
    startTime: z
      .number()
      .min(0, "開始時間が不正です")
      .max(1439, "開始時間が不正です")
      .refine(v => v % 15 === 0, "15分単位で入力してください"),
    endTime: z
      .number()
      .min(0, "終了時間が不正です")
      .max(1440, "終了時間が不正です")
      .refine(v => v % 15 === 0, "15分単位で入力してください"),
    type: TaskTypeEnum,
    color: TaskColorEnum,
    mtgAvailability: MtgAvailabilityEnum,
  })
  .refine(data => data.startTime < data.endTime, {
    message: "終了時間は開始時間より後にしてください",
    path: ["endTime"],
  });

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
