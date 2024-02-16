import { IGuildService } from '@/services/guilds/guild.service';
import { APIGuildService } from '@/services/guilds/impl/api-guild.service';

import { makeAPI } from './make-api';

const guildService = new APIGuildService(makeAPI());

export function makeGuildService(): IGuildService {
  return guildService;
}
