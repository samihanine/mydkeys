'use client';

import { DocumentListPage } from '@/features/document/document-list-page';
import { useMemberTemplates } from '@/features/member-template/use-member-templates';
import { useCurrentMember } from '@/features/member/use-current-member';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { redirect, useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const searchMemberTemplateId = searchParams.get('memberTemplateId');
  const currentMemberQuery = useCurrentMember();
  const memberTemplatesQuery = useMemberTemplates();

  if (memberTemplatesQuery.isFetching || currentMemberQuery.isFetching) {
    return <LoadingSpinner />;
  }

  let memberTemplateId = searchMemberTemplateId || currentMemberQuery.data?.memberTemplateId || undefined;

  if (!memberTemplateId && memberTemplatesQuery.data?.length && memberTemplatesQuery.data.length > 0) {
    memberTemplateId = memberTemplatesQuery.data[0]!.id;
  }

  if (!memberTemplateId) {
    return redirect('/dashboard');
  }

  return <DocumentListPage memberTemplateId={memberTemplateId} />;
}
