import z from 'zod';
import { messageSchema } from '../../schemas/message.schema';

export const getMessagesParamsRequest = z.object({
  channelId: z.string(),
});

export type GetMessagesParamsRequest = z.infer<typeof getMessagesParamsRequest>;

export const getMessagesResponse = z.object({
  messages: z.array(messageSchema),
});

export type GetMessagesResponse = z.infer<typeof getMessagesResponse>;
