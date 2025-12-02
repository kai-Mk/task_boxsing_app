import { auth } from "@/server/auth/config";
import { NextRequest, NextResponse } from "next/server";

type AuthRequest = NextRequest & { auth: { user?: { id: string } } | null };

export default auth((req: AuthRequest) => {
  const isLoggedIn = !!req.auth;
  const isPublicRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // 未ログインで保護ルートにアクセス → ログインへリダイレクト
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // ログイン済みで公開ルートにアクセス → メインページへリダイレクト
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
