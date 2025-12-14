import { prisma } from "@/server/db";

export const teamMemberRepository = {
  findByTeamAndUser: async (teamId: string, userId: string) => {
    return prisma.teamMember.findUnique({
      where: {
        teamId_userId: { teamId, userId },
        deletedAt: null,
      },
    });
  },
};
