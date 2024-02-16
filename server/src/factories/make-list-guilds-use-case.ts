import { ListGuildsUseCase } from '@application/use-cases/guilds/list-guilds.use-case';

import { makeClient } from './make-client';

export function makeListGuildsUseCase() {
  return new ListGuildsUseCase(makeClient());
}
