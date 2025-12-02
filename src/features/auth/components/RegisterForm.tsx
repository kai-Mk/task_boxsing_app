"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "./AuthCard";
import { registerSchema, RegisterFormData } from "@/lib/validators/auth";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // TODO: API呼び出し
  };

  return (
    <AuthCard title="新規登録">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="名前"
          type="text"
          register={register("name")}
          error={errors.name?.message}
        />

        <Input
          label="メールアドレス"
          type="email"
          register={register("email")}
          error={errors.email?.message}
        />

        <Input
          label="パスワード"
          type="password"
          hint="英数字8文字以上"
          register={register("password")}
          error={errors.password?.message}
        />

        <Input
          label="パスワード（確認）"
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" label="登録する" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        すでにアカウントをお持ちの方は
        <Link href="/login" className="text-blue-600 hover:underline ml-1">
          ログイン
        </Link>
      </p>
    </AuthCard>
  );
};

export default RegisterForm;
