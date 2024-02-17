import z from 'zod';

export const receiveMessageInOtherChannelPayload = z.object({
  guildId: z.string(),
  channelId: z.string(),
});

export type ReceiveMessageInOtherChannelPayload = z.infer<
  typeof receiveMessageInOtherChannelPayload
>;
