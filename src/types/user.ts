import { TeamRole } from "@prisma/client";

export type UserWithTeams = {
  id: string;
  name: string;
  email: string;
  lastSelectedTeamId: string | null;
  teamMembers: {
    teamId: string;
    role: TeamRole;
    team: {
      id: string;
      name: string;
    };
  }[];
};
