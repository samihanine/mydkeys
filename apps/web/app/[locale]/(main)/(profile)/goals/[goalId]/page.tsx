import { UpdateGoalPage } from '@/features/goal/update-goal-page';

export default async function Page({ params }: { params: Promise<{ goalId: string }> }) {
  const { goalId } = await params;
  return <UpdateGoalPage goalId={goalId} />;
}
