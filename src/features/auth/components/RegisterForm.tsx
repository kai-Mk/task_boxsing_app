"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import AuthCard from "./AuthCard";
import { registerSchema, RegisterFormData } from "@/lib/validators/auth";
import { apiClient } from "@/lib/api-client";

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);

    const result = await apiClient.post("/api/auth/register", data);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    setShowSuccessToast(true);
  };

  const handleToastClose = () => {
    setShowSuccessToast(false);
    router.push("/login");
  };

  return (
    <>
      {showSuccessToast && (
        <Toast
          message="登録が完了しました"
          type="success"
          onClose={handleToastClose}
        />
      )}

      <AuthCard title="新規登録">
        <form className="relative space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <p className="absolute -top-7 left-0 right-0 text-sm text-red-500 text-center">
              {error}
            </p>
          )}

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

          <Button type="submit" label={isLoading ? "登録中..." : "登録する"} />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <Link href="/login" className="text-blue-600 hover:underline ml-1">
            ログイン
          </Link>
        </p>
      </AuthCard>
    </>
  );
};

export default RegisterForm;
