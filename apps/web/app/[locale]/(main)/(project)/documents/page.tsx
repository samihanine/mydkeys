'use client';

import { DocumentListPage } from '@/features/document/document-list-page';

export default async function Page({ searchParams }: { searchParams: Promise<{ groupId?: string }> }) {
  const { groupId } = await searchParams;
  return <DocumentListPage groupId={groupId} />;
}
