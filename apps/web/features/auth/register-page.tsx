'use client';

import { useRegister } from './use-register';
import { LoginWithGoogleButton } from '@/features/auth/login-with-google-button';
import { useI18n } from '@/locales/client';
import { AtSymbolIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { H2, P } from '@repo/ui/components/typography';
import { toast } from '@repo/ui/hooks/use-toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    name: z
      .string({
        required_error: 'Your name is required.'
      })
      .min(2, {
        message: 'Your name must contain at least 2 characters.'
      }),
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
      }),
    confirmPassword: z
      .string({
        required_error: 'Password confirmation is required.'
      })
      .min(8, {
        message: 'Your password must be at least 8 characters long.'
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const RegisterPage = () => {
  const t = useI18n();
  const registerMutation = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, ...userData } = values;

    const data = await registerMutation.mutateAsync(userData);

    if (data.error) {
      return toast({
        title: t('common.error'),
        description: data.error.message as string,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <Form {...form}>
        <H2 className='mb-4'>{t('register.title')}</H2>
        <P className='text-muted-foreground mb-8'>{t('register.subtitle')}</P>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('register.nameLabel')}</FormLabel>
                <FormControl>
                  <Input Icon={UserIcon} placeholder={t('register.namePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.email')}</FormLabel>
                <FormControl>
                  <Input Icon={AtSymbolIcon} type='email' placeholder={t('register.emailPlaceholder')} {...field} />
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
                    placeholder={t('register.passwordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input
                    Icon={LockClosedIcon}
                    type='password'
                    placeholder={t('register.confirmPasswordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant='secondary' className='mt-4 w-full' type='submit' disabled={registerMutation.isPending}>
            {registerMutation.isPending ? t('register.submittingButton') : t('register.submitButton')}
          </Button>
        </form>
      </Form>

      <LoginWithGoogleButton className='mt-4 w-full' />

      <P className='text-muted-foreground mx-auto text-sm'>
        {t('register.hasAccountText')}{' '}
        <Link href='/login' className='text-primary font-medium underline'>
          {t('register.signInLink')}
        </Link>
      </P>
    </div>
  );
};
