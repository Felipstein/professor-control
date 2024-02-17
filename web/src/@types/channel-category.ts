import { GuildChannel } from './guild-channel';

export type ChannelCategory = {
  id: string;
  name: string;
  position: number;
  channels: GuildChannel[];
};
