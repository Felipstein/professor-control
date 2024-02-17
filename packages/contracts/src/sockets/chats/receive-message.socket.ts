import z from 'zod';
import { messageSchema } from '../../schemas/message.schema';

export const receiveMessagePayload = z.object({
  message: messageSchema,
  channelId: z.string(),
});

export type ReceiveMessagePayload = z.infer<typeof receiveMessagePayload>;
