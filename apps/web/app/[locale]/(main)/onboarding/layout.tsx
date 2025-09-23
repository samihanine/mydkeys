'use client';

import { OnboardingLayout } from '@/features/onboarding/onboarding-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OnboardingLayout>{children}</OnboardingLayout>;
}
