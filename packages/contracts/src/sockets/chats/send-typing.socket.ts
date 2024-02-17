import z from 'zod';

export const sendTypingPayload = z.object({
  channelId: z.string(),
});

export type SendTypingPayload = z.infer<typeof sendTypingPayload>;
