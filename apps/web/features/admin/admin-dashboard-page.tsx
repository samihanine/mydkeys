'use client';

import { NumberCard } from '../dashboard/number-card';
import { useDocumentTemplates } from '../document-template/use-document-templates';
import { useDomains } from '../domain/use-domains';
import { useMemberTemplates } from '../member-template/use-member-templates';
import { useUsers } from '../user/use-users';
import { DocumentIcon, GlobeAltIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';

export const AdminDashboardPage = () => {
  const usersQuery = useUsers();
  const domainsQuery = useDomains();
  const documentTemplatesQuery = useDocumentTemplates();
  const memberTemplatesQuery = useMemberTemplates();
  return (
    <div>
      <div className='flex flex-col gap-4 md:flex-row items-center flex-wrap mb-8'>
        <NumberCard
          title='Domains'
          number={domainsQuery.data?.length ?? 0}
          icon={<GlobeAltIcon className='w-6 h-6 text-primary' />}
          href='/admin/domains'
        />

        <NumberCard
          title='Document templates'
          number={documentTemplatesQuery.data?.length ?? 0}
          icon={<DocumentIcon className='w-6 h-6 text-primary' />}
          href='/admin/document-templates'
        />

        <NumberCard
          title='Member templates'
          number={memberTemplatesQuery.data?.length ?? 0}
          icon={<UserGroupIcon className='w-6 h-6 text-primary' />}
          href='/admin/member-templates'
        />

        <NumberCard
          title='Users'
          number={usersQuery.data?.length ?? 0}
          icon={<UserIcon className='w-6 h-6 text-primary' />}
          href='/admin/users'
        />
      </div>
    </div>
  );
};
