import { NextResponse } from "next/server";
import { createTeamSchema } from "@/lib/validators/team";
import { teamService } from "@/server/team/team.service";
import { getCurrentUser } from "@/server/auth/getCurrentUser";

export const POST = async (req: Request) => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: "認証が必要です" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = createTeamSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const { name, description } = parsed.data;

    const result = await teamService.create({
      name,
      description,
      ownerId: user.id,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("POST /api/teams error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
