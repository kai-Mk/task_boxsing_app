import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          ログイン
        </h1>

        <form className="space-y-6">
          <Input label="メールアドレス" type="email" name="email" />

          <Input label="パスワード" type="password" name="password" />

          <Button type="submit">ログイン</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない方は
          <Link href="/register" className="text-blue-600 hover:underline ml-1">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
