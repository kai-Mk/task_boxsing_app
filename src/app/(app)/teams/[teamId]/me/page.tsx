type Props = {
  params: Promise<{ teamId: string }>;
};

const TeamMePage = async ({ params }: Props) => {
  const { teamId } = await params;

  return (
    <div>
      <h1>個人タスク管理</h1>
      <p>Team ID: {teamId}</p>
      {/* TODO: タスク管理UI */}
    </div>
  );
};

export default TeamMePage;
