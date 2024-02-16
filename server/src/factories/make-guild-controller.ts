import { GuildController } from '@application/controllers/guild.controller';

import { makeListGuildsUseCase } from './make-list-guilds-use-case';

export function makeGuildController() {
  return new GuildController(makeListGuildsUseCase());
}
