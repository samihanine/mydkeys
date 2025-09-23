import { useI18n } from '@/locales/client';
import { H2, P } from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useI18n();
  const pathname = usePathname();
  const steps = [
    {
      title: 'Bienvenue ! Créez un nouveau projet',
      description: 'Veuillez fournir les informations nécessaires pour personnaliser votre expérience.',
      href: '/onboarding/project'
    },
    {
      title: 'Renseignez les informations du projet',
      description: 'Veuillez fournir les informations nécessaires pour personnaliser votre expérience.',
      href: '/onboarding/specifications'
    },
    {
      title: 'Ajouter des parties prenantes',
      description: 'Veuillez fournir les informations nécessaires pour personnaliser votre expérience.',
      href: '/onboarding/members'
    },
    {
      title: 'Inviter des membres',
      description: 'Veuillez fournir les informations nécessaires pour personnaliser votre expérience.',
      href: '/onboarding/invitations'
    }
  ];

  const currentStep = useMemo(() => {
    return steps.findIndex((step) => pathname.includes(step.href));
  }, [steps, pathname]);

  return (
    <div className='w-full flex-1 p-5 md:p-10 mx-auto h-full overflow-y-auto'>
      <div className='w-full max-w-4xl mx-auto'>
        <div className='flex items-center justify-center mb-8'>
          {steps.map((step, index) => (
            <div key={step.title} className='flex items-center justify-center'>
              <div className='flex items-center justify-center'>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full text-white flex items-center justify-center',
                    index > currentStep && 'bg-gray-200',
                    index <= currentStep && 'bg-primary'
                  )}
                >
                  {index + 1}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-20 h-1 bg-gray-200',
                    index > currentStep && 'bg-gray-200',
                    index < currentStep && 'bg-primary'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <H2 className='mb-0 text-3xl font-bold text-gray-800 text-center'>{t('project.onboardingTitle')}</H2>
          <P className='text-muted-foreground text-center text-sm mb-8'>{t('project.subtitle')}</P>
        </div>

        {children}
      </div>
    </div>
  );
};
