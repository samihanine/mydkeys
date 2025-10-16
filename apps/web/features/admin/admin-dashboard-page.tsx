'use client';

import { NumberCard } from '../dashboard/number-card';
import { useDocumentTemplates } from '../document-template/use-document-templates';
import { useGroupTemplates } from '../group-template/use-group-templates';
import { useUsers } from '../user/use-users';
import { DocumentIcon, TagIcon, UserIcon } from '@heroicons/react/24/solid';

export const AdminDashboardPage = () => {
  const usersQuery = useUsers();
  const documentTemplatesQuery = useDocumentTemplates();
  const groupTemplatesQuery = useGroupTemplates();
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <NumberCard
          title='Utilisateurs'
          number={usersQuery.data?.length ?? 0}
          icon={<UserIcon className='w-6 h-6 text-primary' />}
          href='/admin/users'
        />

        <NumberCard
          title='Templates de documents'
          number={documentTemplatesQuery.data?.length ?? 0}
          icon={<DocumentIcon className='w-6 h-6 text-primary' />}
          href='/admin/document-templates'
        />

        <NumberCard
          title='Templates de groupes'
          number={groupTemplatesQuery.data?.length ?? 0}
          icon={<TagIcon className='w-6 h-6 text-primary' />}
          href='/admin/group-templates'
        />
      </div>
    </div>
  );
};
