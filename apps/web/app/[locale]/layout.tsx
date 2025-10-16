import '../globals.css';
import { Providers } from '@/components/providers';
import { I18nProviderClient } from '@/locales/client';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: 'MyDkeys',
  description: 'Gérez, Partagez et Sécurisez vos documents',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydkeys.com'),
  openGraph: {
    images: 'opengraph-image.png'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

const RootLayout = async ({ children, params }: any) => {
  const { locale } = await params;

  return (
    <html lang={locale} className='h-full overflow-x-hidden overflow-y-auto'>
      <body className={`${roboto.className} ${roboto.variable} min-h-full`}>
        <I18nProviderClient locale={locale}>
          <Providers>{children}</Providers>
        </I18nProviderClient>
      </body>
    </html>
  );
};

export default RootLayout;
