import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth/getCurrentUser";
import { userService } from "@/server/user/user.service";

const HomePage = async () => {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const result = await userService.getCurrentUserWithTeams(user.id);
  if (!result.success) {
    redirect("/login");
  }

  const { teamMembers, lastSelectedTeamId } = result.data;
  if (teamMembers.length === 0) {
    redirect("/teams/new");
  }

  const teamId = lastSelectedTeamId ?? teamMembers[0].teamId;
  redirect(`/teams/${teamId}/me`);
};

export default HomePage;
