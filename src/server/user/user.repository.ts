import { prisma } from "@/server/db";

export const userRepository = {
  create: async (data: {
    name: string;
    email: string;
    passwordHash: string;
  }) => {
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

  findByIdWithTeams: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        lastSelectedTeamId: true,
        teamMembers: {
          select: {
            teamId: true,
            role: true,
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  },
};
