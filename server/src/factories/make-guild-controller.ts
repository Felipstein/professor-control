import { GuildController } from '@application/controllers/guild.controller';

import { makeListGuildsUseCase } from './make-list-guilds-use-case';
import { makeGetGuildByIdUseCase } from './make-get-guild-by-id-use-case';

export function makeGuildController() {
  return new GuildController(
    makeListGuildsUseCase(),
    makeGetGuildByIdUseCase(),
  );
}
