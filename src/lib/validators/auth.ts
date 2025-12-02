import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "名前を入力してください"),
    email: z.email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, "8文字以上で入力してください")
      .regex(/[a-zA-Z]/, "英字を含めてください")
      .regex(/[0-9]/, "数字を含めてください"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(1, "パスワードを入力してください"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
