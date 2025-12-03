import { NextResponse } from "next/server";
import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { userService } from "@/server/user/user.service";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json(
        { success: false, message: "ユーザー情報の取得に失敗しました" },
        { status: 401 }
      );
    }

    const result = await userService.getCurrentUserWithTeams(currentUser.id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("GET /api/user/me error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
