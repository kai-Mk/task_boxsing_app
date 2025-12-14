import { prisma } from "@/server/db";
import { TeamRole } from "@prisma/client";

export const teamRepository = {
  create: async (data: { name: string; description?: string | null; ownerId: string }) => {
    return prisma.team.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        members: {
          create: {
            userId: data.ownerId,
            role: TeamRole.ADMIN,
          },
        },
      },
    });
  },
};
