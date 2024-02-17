import z from 'zod';

export const receiveTypingPayload = z.object({
  channelId: z.string(),
});

export type ReceiveTypingPayload = z.infer<typeof receiveTypingPayload>;
