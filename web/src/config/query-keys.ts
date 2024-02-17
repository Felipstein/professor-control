import { GetMessagesRequest } from '@/services/guilds/chat.service';
import { GetGuildByIdRequest } from '@/services/guilds/guild.service';

export const queryKeys = {
  getGuilds: () => ['guilds'],
  getGuildById: (request: GetGuildByIdRequest) => ['guild', request],
  getMessages: (request: GetMessagesRequest) => [
    'channel',
    request,
    'messages',
  ],
};
