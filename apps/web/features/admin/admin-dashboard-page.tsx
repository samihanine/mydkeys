'use client';

import { useCategoryTemplates } from '../category-template/use-category-templates';
import { NumberCard } from '../dashboard/number-card';
import { useDocumentTemplates } from '../document-template/use-document-templates';
import { useDomains } from '../domain/use-domains';
import { useUsers } from '../user/use-users';
import { useSpecificationTemplates } from '@/features/specification-template/use-specification-templates';
import { DocumentIcon, GlobeAltIcon, InformationCircleIcon, TagIcon, UserIcon } from '@heroicons/react/24/solid';

export const AdminDashboardPage = () => {
  const usersQuery = useUsers();
  const domainsQuery = useDomains();
  const documentTemplatesQuery = useDocumentTemplates();
  const specificationTemplatesQuery = useSpecificationTemplates();
  const categoryTemplatesQuery = useCategoryTemplates();
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <NumberCard
          title='Industries'
          number={domainsQuery.data?.length ?? 0}
          icon={<GlobeAltIcon className='w-6 h-6 text-primary' />}
          href='/admin/domains'
        />

        <NumberCard
          title='Gabarits de documents'
          number={documentTemplatesQuery.data?.length ?? 0}
          icon={<DocumentIcon className='w-6 h-6 text-primary' />}
          href='/admin/document-templates'
        />

        <NumberCard
          title="Types d'informations"
          number={specificationTemplatesQuery.data?.length ?? 0}
          icon={<InformationCircleIcon className='w-6 h-6 text-primary' />}
          href='/admin/specification-templates'
        />

        <NumberCard
          title='Users'
          number={usersQuery.data?.length ?? 0}
          icon={<UserIcon className='w-6 h-6 text-primary' />}
          href='/admin/users'
        />

        <NumberCard
          title='Categories'
          number={categoryTemplatesQuery.data?.length ?? 0}
          icon={<TagIcon className='w-6 h-6 text-primary' />}
          href='/admin/category-templates'
        />
      </div>
    </div>
  );
};
