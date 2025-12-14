import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/getCurrentUser";
import { teamMemberService } from "@/server/teamMember/teamMember.service";
import { taskService } from "@/server/task/task.service";
import { getTodayUTC } from "@/lib/utils/date";

type Props = {
  params: Promise<{ teamId: string }>;
};

const MyTasksPage = async ({ params }: Props) => {
  const user = await getAuthenticatedUser();
  const { teamId } = await params;

  // TeamMemberを取得
  const teamMemberResult = await teamMemberService.getByTeamAndUser(teamId, user.id);
  if (!teamMemberResult.success) {
    redirect("/teams/new");
  }
  const teamMember = teamMemberResult.data;

  // 今日の日付でタスク取得
  const today = getTodayUTC();
  const tasksResult = await taskService.getByTeamMemberAndDate(teamMember.id, today);
  const tasks = tasksResult.success ? tasksResult.data : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">マイタスク</h1>
      <p className="text-gray-600 mt-2">チームID: {teamId}</p>
      <p className="text-gray-600">タスク数: {tasks.length}</p>
      {/* TODO: TasksPageコンポーネントに置き換え */}
    </div>
  );
};

export default MyTasksPage;
