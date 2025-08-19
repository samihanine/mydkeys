import { Header } from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-hidden flex flex-col'>
      <Header />
      {children}
    </div>
  );
}
