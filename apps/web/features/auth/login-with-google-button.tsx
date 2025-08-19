import { useLoginWithGoogle } from './use-login-with-google';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { GoogleIcon } from '@repo/ui/icons/google';
import { cn } from '@repo/ui/lib/utils';

export const LoginWithGoogleButton = ({ className }: { className?: string }) => {
  const t = useI18n();
  const loginWithGoogleMutation = useLoginWithGoogle();

  return (
    <Button
      variant='outline'
      onClick={() => loginWithGoogleMutation.mutate()}
      className={cn(className)}
      disabled={loginWithGoogleMutation.isPending}
    >
      <GoogleIcon className='mr-2 h-4 w-4' />
      {t('login.googleButton')}
    </Button>
  );
};
