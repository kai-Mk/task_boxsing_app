"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import AuthCard from "./AuthCard";
import { loginSchema, LoginFormData } from "@/lib/validators/auth";
import { apiClient } from "@/lib/api-client";
import { UserWithTeams } from "@/lib/types/user";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません");
      setIsLoading(false);
      return;
    }

    // ユーザー情報（チーム含む）を取得
    const userRes = await apiClient.get<UserWithTeams>("/api/user/me");

    if (!userRes.success) {
      setError(userRes.message);
      setIsLoading(false);
      return;
    }

    const { teamMembers, lastSelectedTeamId } = userRes.data;
    if (teamMembers.length === 0) {
      setRedirectPath("/teams/new");
    } else {
      const teamId = lastSelectedTeamId ?? teamMembers[0].teamId;
      setRedirectPath(`/teams/${teamId}/me`);
    }

    setShowSuccessToast(true);
  };

  const handleToastClose = () => {
    setShowSuccessToast(false);
    router.push(redirectPath);
  };

  return (
    <>
      {showSuccessToast && (
        <Toast
          message="ログインしました"
          type="success"
          onClose={handleToastClose}
        />
      )}

      <AuthCard title="ログイン">
        <form className="relative space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <p className="absolute -top-7 left-0 right-0 text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Input
            label="メールアドレス"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />

          <Input
            label="パスワード"
            type="password"
            register={register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            label={isLoading ? "ログイン中..." : "ログイン"}
          />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない方は
          <Link href="/register" className="text-blue-600 hover:underline ml-1">
            新規登録
          </Link>
        </p>
      </AuthCard>
    </>
  );
};

export default LoginForm;
