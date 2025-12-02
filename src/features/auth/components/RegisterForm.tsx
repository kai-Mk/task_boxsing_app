"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "./AuthCard";

const RegisterForm = () => {
  return (
    <AuthCard title="新規登録">
      <form className="space-y-6">
        <Input label="名前" type="text" name="name" />

        <Input label="メールアドレス" type="email" name="email" />

        <Input
          label="パスワード"
          type="password"
          name="password"
          hint="英数字8文字以上"
        />

        <Input
          label="パスワード（確認）"
          type="password"
          name="confirmPassword"
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
