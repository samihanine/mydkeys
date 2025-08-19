import { z } from 'zod';

export const createResponseSchema = (data: z.ZodSchema) => {
  return z.object({
    data: data.nullable(),
    message: z.string().optional()
  });
};
