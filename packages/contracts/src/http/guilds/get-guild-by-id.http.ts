import z from 'zod';
import { userSchema } from '../../schemas/user.schema';

export const getGuildByIdParamsRequest = z.object({
  guildId: z.string().min(1, 'ID do servidor é obrigatório'),
});

export type GetGuildByIdParamsRequest = z.infer<
  typeof getGuildByIdParamsRequest
>;

export const getGuildByIdResponse = z.object({
  id: z.string(),
  name: z.string(),
  avatarKey: z.string(),
  channels: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      parentId: z.string().nullable(),
      nsfw: z.boolean(),
      type: z.enum(['text', 'voice', 'category', 'forum', 'stage']),
      position: z.number(),
    }),
  ),
  members: z.array(userSchema),
});

export type GetGuildByIdResponse = z.infer<typeof getGuildByIdResponse>;
