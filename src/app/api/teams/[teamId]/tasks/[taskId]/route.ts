import { NextResponse } from "next/server";
import { updateTaskSchema } from "@/lib/validators/task";
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

export const PUT = async (req: Request, { params }: Props) => {
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

    const body = await req.json();
    const parsed = updateTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const result = await taskService.update(taskId, teamMember.id, {
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
    console.error("PUT /api/teams/[teamId]/tasks/[taskId] error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
