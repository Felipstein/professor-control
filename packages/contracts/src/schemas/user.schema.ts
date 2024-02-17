import z from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  globalName: z.string(),
  serverName: z.string().nullable(),
  bot: z.boolean(),
  avatar: z.string(),
  serverAvatar: z.string().nullable(),
});
