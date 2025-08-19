import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: (process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.mydkeys.ca') + '/auth',
  user: {
    additionalFields: {
      selectedprojectId: {
        type: 'string',
        required: false,
        defaultValue: null
      }
    }
  }
});
