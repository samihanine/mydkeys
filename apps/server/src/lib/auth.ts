import { resend } from './resend';
import { and, db, eq, invitation, isNull, member } from '@repo/database';
import { renderResetPasswordEmail, renderVerificationEmail, renderWelcomeEmail } from '@repo/email';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  user: {
    additionalFields: {
      selectedProjectId: {
        type: 'string',
        required: false,
        defaultValue: null
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      const email = user?.email || '';
      const name = user?.name || '';
      await resend.emails.send({
        from: `MyDkeys <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: `Reset Password for ${name}`,
        html: renderResetPasswordEmail({ name, url })
      });
    }
  },
  trustedOrigins: ['http://localhost:3000', 'https://mydkeys.ca', 'https://api.mydkeys.ca', 'https://app.mydkeys.ca'],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const email = user?.email || '';
      const name = user?.name || '';
      const urlObj = new URL(url);
      urlObj.searchParams.set('callbackURL', process.env.NEXT_PUBLIC_APP_URL + '/onboarding');
      url = urlObj.toString();
      await resend.emails.send({
        from: `MyDkeys <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: `Welcome to MyDkeys ${name}!`,
        html: renderVerificationEmail({ name, url })
      });
    },
    autoSignInAfterVerification: true,
    onEmailVerification: async (user) => {
      const email = user.email;
      const name = user.name || '';
      await resend.emails.send({
        from: `MyDkeys <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: `Welcome to MyDkeys ${name}!`,
        html: renderWelcomeEmail({ name, url: process.env.NEXT_PUBLIC_APP_URL + '/onboarding' })
      });
    }
  },
  basePath: '/auth',
  plugins: [admin(), openAPI()],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            if (!user.emailVerified || !user.email) {
              return;
            }

            const email = user.email;
            const name = user.name || '';
            await resend.emails.send({
              from: `MyDkeys <${process.env.RESEND_FROM_EMAIL}>`,
              to: email,
              subject: `Welcome to MyDkeys ${name}!`,
              html: renderWelcomeEmail({ name, url: process.env.NEXT_PUBLIC_APP_URL + '/onboarding' })
            });

            await db
              .update(member)
              .set({
                userId: user.id,
                metaJson: {
                  image: user.image || undefined
                }
              })
              .where(and(eq(member.externalEmail, email), isNull(member.userId)));

            const members = await db.query.member.findMany({
              where: eq(member.externalEmail, user.email)
            });

            for (const memberData of members) {
              await db
                .update(invitation)
                .set({ accessGrantedAt: new Date().toISOString() })
                .where(and(eq(invitation.memberId, memberData.id), isNull(invitation.accessGrantedAt)));
              await db
                .update(member)
                .set({ userId: user.id })
                .where(and(eq(member.id, memberData.id), isNull(member.userId)));
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  }
});
