import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validators/auth";
import { userService } from "@/server/user/user.service";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const result = await userService.register({ name, email, password });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, data: result.user });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
