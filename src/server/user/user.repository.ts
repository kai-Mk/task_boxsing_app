import { prisma } from "@/server/db";

export const userRepository = {
  create: async (data: { name: string; email: string; passwordHash: string }) => {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
