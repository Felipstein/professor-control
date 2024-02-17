import z from 'zod';
import { userSchema } from './user.schema';

export const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: userSchema,
});
