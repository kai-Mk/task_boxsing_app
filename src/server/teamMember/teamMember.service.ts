import { teamMemberRepository } from "./teamMember.repository";
import { TeamMember } from "@prisma/client";
import { ServiceResult } from "@/types/server/result";

export const teamMemberService = {
  getByTeamAndUser: async (
    teamId: string,
    userId: string
  ): Promise<ServiceResult<TeamMember>> => {
    const teamMember = await teamMemberRepository.findByTeamAndUser(teamId, userId);
    if (!teamMember) {
      return { success: false, message: "チームに所属していません", status: 403 };
    }
    return { success: true, data: teamMember };
  },
};
