import { UpdateCategoryPage } from '@/features/category/update-category-page';

export default async function Page({ params }: { params: Promise<{ locale: string; categoryId: string }> }) {
  const { categoryId } = await params;
  return <UpdateCategoryPage id={categoryId} />;
}
