import { NextResponse } from "next/server";
import { z } from "zod";
import { taskService } from "@/server/task/task.service";
import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { prisma } from "@/server/db";

const updateStatusSchema = z.object({
  status: z.enum(["TODO", "DONE"]),
});

type Props = {
  params: Promise<{ teamId: string; taskId: string }>;
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

    const { teamId, taskId } = await params;

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
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const result = await taskService.updateStatus(taskId, parsed.data.status);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error(
      "POST /api/teams/[teamId]/tasks/[taskId]/status error:",
      error
    );
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
