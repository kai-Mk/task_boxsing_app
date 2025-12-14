import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "チーム名を入力してください")
    .max(50, "チーム名は50文字以内で入力してください"),
  description: z
    .string()
    .max(300, "詳細は300文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

export type CreateTeamFormData = z.infer<typeof createTeamSchema>;
