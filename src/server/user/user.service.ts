import bcrypt from "bcryptjs";
import { userRepository } from "./user.repository";
import { UserWithTeams } from "@/lib/types/user";

const SALT_ROUNDS = 10;

type RegisterResult =
  | { success: true; user: { id: string; name: string; email: string } }
  | { success: false; message: string; status: number };

type GetCurrentUserWithTeamsResult =
  | { success: true; data: UserWithTeams }
  | { success: false; message: string; status: number };

export const userService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<RegisterResult> => {
    // メール重複チェック
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: "このメールアドレスは既に登録されています",
        status: 400,
      };
    }

    // パスワードハッシュ化
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    // ユーザー作成
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    };
  },

  getCurrentUserWithTeams: async (userId: string): Promise<GetCurrentUserWithTeamsResult> => {
    const user = await userRepository.findByIdWithTeams(userId);
    if (!user) {
      return { success: false, message: "ユーザーが見つかりません", status: 404 };
    }
    return { success: true, data: user };
  },
};
