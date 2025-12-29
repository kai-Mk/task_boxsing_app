import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/getCurrentUser";
import { teamMemberService } from "@/server/teamMember/teamMember.service";
import { taskService } from "@/server/task/task.service";
import { getTodayUTC } from "@/lib/utils/date";
import TasksPage from "@/features/tasks/components/TasksPage";
import { MOCK_TASKS } from "@/features/tasks/mocks/taskMocks";

type Props = {
  params: Promise<{ teamId: string }>;
};

// モック表示切り替えフラグ（開発用）
const USE_MOCK = true;

const MyTasksPage = async ({ params }: Props) => {
  const user = await getAuthenticatedUser();
  const { teamId } = await params;

  // TeamMemberを取得
  const teamMemberResult = await teamMemberService.getByTeamAndUser(teamId, user.id);
  if (!teamMemberResult.success) {
    redirect("/teams/new");
  }

  const today = getTodayUTC();

  // モック or 実データ
  let tasks;
  if (USE_MOCK) {
    tasks = MOCK_TASKS;
  } else {
    const teamMember = teamMemberResult.data;
    const tasksResult = await taskService.getByTeamMemberAndDate(teamMember.id, today);
    tasks = tasksResult.success ? tasksResult.data : [];
  }

  return (
    <div className="h-[calc(100vh-64px)] p-6">
      <TasksPage initialTasks={tasks} initialDate={today} teamId={teamId} />
    </div>
  );
};

export default MyTasksPage;
