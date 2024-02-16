import z from 'zod';

export const getGuildsResponse = z.object({
  guilds: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatarKey: z.string(),
    }),
  ),
});

export type GetGuildsResponse = z.infer<typeof getGuildsResponse>;
