import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * 現在のセッションからユーザー情報を取得
 */
export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};

/**
 * 認証済みユーザーを取得（ページ用）
 * 未認証の場合はログインページにリダイレクト
 */
export const getAuthenticatedUser = async () => {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }
  return user;
};
