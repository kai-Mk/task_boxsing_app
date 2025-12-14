import { NextResponse } from "next/server";
import { createTaskSchema } from "@/lib/validators/task";
import { taskService } from "@/server/task/task.service";
import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { prisma } from "@/server/db";

type Props = {
  params: Promise<{ teamId: string }>;
};

export const GET = async (req: Request, { params }: Props) => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: "認証が必要です" },
        { status: 401 }
      );
    }

    const { teamId } = await params;

    // TeamMemberを取得
    const teamMember = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: { teamId, userId: user.id },
        deletedAt: null,
      },
    });

    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "チームに所属していません" },
        { status: 403 }
      );
    }

    // クエリパラメータから日付を取得
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json(
        { success: false, message: "日付を指定してください" },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);

    const result = await taskService.getByTeamMemberAndDate(teamMember.id, date);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("GET /api/teams/[teamId]/tasks error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, { params }: Props) => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: "認証が必要です" },
        { status: 401 }
      );
    }

    const { teamId } = await params;

    // TeamMemberを取得
    const teamMember = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: { teamId, userId: user.id },
        deletedAt: null,
      },
    });

    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "チームに所属していません" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const result = await taskService.create({
      teamMemberId: teamMember.id,
      ...parsed.data,
      description: parsed.data.description || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("POST /api/teams/[teamId]/tasks error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
