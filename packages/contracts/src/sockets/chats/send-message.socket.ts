import z from 'zod';

export const sendMessagePayload = z.object({
  message: z.string(),
  channelId: z.string(),
});

export type SendMessagePayload = z.infer<typeof sendMessagePayload>;
