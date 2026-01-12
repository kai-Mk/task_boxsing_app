import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/getCurrentUser";
import { teamMemberService } from "@/server/teamMember/teamMember.service";
import { taskService } from "@/server/task/task.service";
import { getTodayUTC } from "@/lib/utils/date";
import TasksPage from "@/features/tasks/components/TasksPage";

type Props = {
  params: Promise<{ teamId: string }>;
};

const MyTasksPage = async ({ params }: Props) => {
  const user = await getAuthenticatedUser();
  const { teamId } = await params;

  // TeamMemberを取得
  const teamMemberResult = await teamMemberService.getByTeamAndUser(
    teamId,
    user.id
  );
  if (!teamMemberResult.success) {
    redirect("/teams/new");
  }

  const today = getTodayUTC();
  const teamMember = teamMemberResult.data;
  const tasksResult = await taskService.getByTeamMemberAndDate(
    teamMember.id,
    today
  );
  const tasks = tasksResult.success ? tasksResult.data : [];

  return (
    <div className="h-[calc(100vh-64px)] p-6">
      <TasksPage initialTasks={tasks} initialDate={today} teamId={teamId} />
    </div>
  );
};

export default MyTasksPage;
