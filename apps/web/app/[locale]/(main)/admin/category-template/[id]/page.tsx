import { UpdateCategoryPage } from '@/features/category/update-category-page';

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <UpdateCategoryPage id={id} />;
}
