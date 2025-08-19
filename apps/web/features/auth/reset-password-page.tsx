'use client';

import { useResetPassword } from './use-reset-password';
import { useI18n } from '@/locales/client';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { H2, H3, P } from '@repo/ui/components/typography';
import { toast } from '@repo/ui/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

export const ResetPasswordPage = ({ token }: { token?: string }) => {
  const t = useI18n();
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  if (!token) {
    return <H3>{t('resetPassword.errorMessage')}</H3>;
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('resetPassword.passwordMismatchError')
      });
      return;
    }

    const result = await resetPasswordMutation.mutateAsync({
      newPassword: values.password,
      token
    });

    if (result.error) {
      toast({
        title: t('common.error'),
        description: result.error.message
      });
    } else {
      toast({
        title: t('common.success'),
        description: t('resetPassword.successMessage')
      });

      router.push('/login');
    }
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='flex flex-col gap-5'>
        <div className='mb-5'>
          <H2 className='mb-2 text-center'>{t('resetPassword.title')}</H2>

          <P className='text-center'>{t('resetPassword.subtitle')}</P>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.password')}</FormLabel>
                  <FormControl>
                    <Input Icon={LockClosedIcon} type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input Icon={LockClosedIcon} type='password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='mt-8 flex flex-col gap-4'>
              <Button type='submit' variant='secondary' className='w-full' disabled={resetPasswordMutation.isPending}>
                {resetPasswordMutation.isPending
                  ? t('resetPassword.submittingButton')
                  : t('resetPassword.submitButton')}
              </Button>
              <Link href='/login'>
                <Button variant='outline' className='w-full'>
                  {t('common.backToHome')}
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
