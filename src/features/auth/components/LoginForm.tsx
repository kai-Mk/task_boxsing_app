"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "./AuthCard";

const LoginForm = () => {
  return (
    <AuthCard title="ログイン">
      <form className="space-y-6">
        <Input label="メールアドレス" type="email" name="email" />

        <Input label="パスワード" type="password" name="password" />

        <Button type="submit" label="ログイン" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        アカウントをお持ちでない方は
        <Link href="/register" className="text-blue-600 hover:underline ml-1">
          新規登録
        </Link>
      </p>
    </AuthCard>
  );
};

export default LoginForm;
