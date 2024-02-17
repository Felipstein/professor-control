import { ListGuildsUseCase } from '@application/use-cases/guilds/list-guilds.use-case';

import { client } from '../discordBot';

export function makeListGuildsUseCase() {
  return new ListGuildsUseCase(client);
}
