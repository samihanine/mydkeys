'use client';

import { useLoginWithPassword } from './use-login-with-password';
import { LoginWithGoogleButton } from '@/features/auth/login-with-google-button';
import { useI18n } from '@/locales/client';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { H2, P } from '@repo/ui/components/typography';
import { toast } from '@repo/ui/hooks/use-toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Your email address is required.'
    })
    .email({
      message: 'Your email address is invalid.'
    }),
  password: z
    .string({
      required_error: 'Your password is required.'
    })
    .min(8, {
      message: 'Your password must be at least 8 characters long.'
    })
});

export const LoginPage = () => {
  const t = useI18n();
  const loginMutation = useLoginWithPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await loginMutation.mutateAsync({
      email: values.email,
      password: values.password
    });

    if (result.error) {
      return toast({
        title: t('common.error'),
        description: result.error.message as string,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <Form {...form}>
        <H2 className='mb-4'>{t('login.title')}</H2>
        <P className='text-muted-foreground mb-8'>{t('login.subtitle')}</P>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.email')}</FormLabel>
                <FormControl>
                  <Input Icon={AtSymbolIcon} type='email' placeholder={t('login.emailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.password')}</FormLabel>
                <FormControl>
                  <Input
                    Icon={LockClosedIcon}
                    type='password'
                    placeholder={t('login.passwordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant='secondary' className='mt-4 w-full' type='submit' disabled={loginMutation.isPending}>
            {loginMutation.isPending ? t('login.submittingButton') : t('login.submitButton')}
          </Button>
        </form>
      </Form>

      <LoginWithGoogleButton className='mt-4 w-full' />

      <div className='mt-8 flex flex-col'>
        <P className='text-muted-foreground text-sm'>
          {t('login.noAccountText')}{' '}
          <Link href='/register' className='text-primary font-medium underline'>
            {t('login.createAccountLink')}
          </Link>
        </P>

        <P className='text-muted-foreground !mt-2 text-sm'>
          {t('login.forgotPasswordText')}{' '}
          <Link href='/forgot-password' className='text-primary font-medium underline'>
            {t('login.resetPasswordLink')}
          </Link>
        </P>
      </div>
    </div>
  );
};
