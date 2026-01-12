import { prisma } from "@/server/db";
import { TaskType, TaskColor, MtgAvailability } from "@prisma/client";

export const taskRepository = {
  create: async (data: {
    teamMemberId: string;
    date: Date;
    title: string;
    description?: string | null;
    startTime: number;
    endTime: number;
    type: TaskType;
    color: TaskColor;
    mtgAvailability: MtgAvailability;
  }) => {
    return prisma.task.create({
      data: {
        teamMemberId: data.teamMemberId,
        date: data.date,
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        type: data.type,
        color: data.color,
        mtgAvailability: data.mtgAvailability,
      },
    });
  },

  findByTeamMemberAndDate: async (teamMemberId: string, date: Date) => {
    return prisma.task.findMany({
      where: {
        teamMemberId,
        date,
        deletedAt: null,
      },
      orderBy: [
        { startTime: "asc" },
        { id: "asc" },
      ],
    });
  },

  findById: async (id: string) => {
    return prisma.task.findUnique({
      where: { id },
    });
  },

  softDelete: async (id: string) => {
    return prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};
