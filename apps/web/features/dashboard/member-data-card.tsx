import { useCurrentUser } from '../auth/use-current-user';
import { useGroupMembersByCurrentProject } from '../group-member/use-group-members-by-current-project';
import { GroupBadge } from '../group/group-badge';
import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { useCurrentMember } from '../member/use-current-member';
import { UserAvatar } from '@/features/user/user-avatar';
import { Card, CardContent } from '@repo/ui/components/card';

export const MemberDataCard = () => {
  const currentMemberQuery = useCurrentMember();
  const groupsQuery = useGroupsByCurrentProject();
  const groupMembersQuery = useGroupMembersByCurrentProject();
  const currentUserQuery = useCurrentUser();

  const groupMembers = groupMembersQuery.data?.filter(
    (groupMember) => groupMember.memberId === currentMemberQuery.data?.id
  );
  const groups = groupsQuery.data?.filter((group) =>
    groupMembers?.some((groupMember) => groupMember.groupId === group.id)
  );

  return (
    <Card>
      <CardContent className='flex items-center flex-col gap-2 justify-center'>
        <UserAvatar user={currentUserQuery.data!} className='h-20 w-20' />

        <div>
          <p className='text-lg font-bold'>{currentMemberQuery.data?.displayName}</p>
          <p className='text-sm text-muted-foreground'>{currentMemberQuery.data?.title}</p>
        </div>

        <div className='flex gap-2 flex-wrap'>{groups?.map((group) => <GroupBadge group={group} />)}</div>
      </CardContent>
    </Card>
  );
};
