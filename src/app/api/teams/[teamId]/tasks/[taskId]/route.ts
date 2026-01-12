import { NextResponse } from "next/server";
import { taskService } from "@/server/task/task.service";
import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { prisma } from "@/server/db";

type Props = {
  params: Promise<{ teamId: string; taskId: string }>;
};

export const DELETE = async (_req: Request, { params }: Props) => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: "認証が必要です" },
        { status: 401 }
      );
    }

    const { teamId, taskId } = await params;

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

    const result = await taskService.delete(taskId, teamMember.id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("DELETE /api/teams/[teamId]/tasks/[taskId] error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
