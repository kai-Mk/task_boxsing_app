import { teamRepository } from "./team.repository";
import { Team } from "@prisma/client";
import { ServiceResult } from "@/types/server/result";

export const teamService = {
  create: async (data: {
    name: string;
    description?: string;
    ownerId: string;
  }): Promise<ServiceResult<Team>> => {
    const team = await teamRepository.create({
      name: data.name,
      description: data.description || null,
      ownerId: data.ownerId,
    });

    return { success: true, data: team };
  },
};
