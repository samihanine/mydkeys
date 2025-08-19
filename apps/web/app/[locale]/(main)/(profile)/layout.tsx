import { ProfileLayout } from '@/features/profile/profile-layout';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <ProfileLayout>{children}</ProfileLayout>;
};

export default RootLayout;
