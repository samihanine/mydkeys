export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full overflow-y-auto h-screen'>
      <div className='w-full max-w-4xl flex-1 p-5 md:p-10 mx-auto h-full'>{children}</div>
    </div>
  );
}
