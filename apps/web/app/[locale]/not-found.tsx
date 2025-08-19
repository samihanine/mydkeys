'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-center p-4'>
      <h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='mb-8 text-lg'>The page you are looking for does not exist.</p>
      <Link href='/' className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors'>
        Return to Home
      </Link>
    </div>
  );
}
