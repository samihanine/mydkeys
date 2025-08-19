import { Card } from '@repo/ui/components/card';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Card className='w-full max-w-4xl flex-1 p-5 md:p-10 mx-auto my-10 overflow-y-auto'>{children}</Card>;
}
