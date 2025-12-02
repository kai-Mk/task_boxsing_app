import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          新規登録
        </h1>

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

          <Button type="submit">登録する</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は
          <Link href="/login" className="text-blue-600 hover:underline ml-1">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
