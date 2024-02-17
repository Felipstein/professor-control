import z from 'zod';
import { userSchema } from '../../schemas/user.schema';

export const getMessagesParamsRequest = z.object({
  channelId: z.string(),
});

export type GetMessagesParamsRequest = z.infer<typeof getMessagesParamsRequest>;

export const getMessagesResponse = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      author: userSchema,
    }),
  ),
});

export type GetMessagesResponse = z.infer<typeof getMessagesResponse>;
