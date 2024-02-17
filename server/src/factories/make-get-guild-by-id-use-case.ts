import { GetGuildByIdUseCase } from '@application/use-cases/guilds/get-guild-by-id.use-case';
import { client } from '../discordBot';

export function makeGetGuildByIdUseCase() {
  return new GetGuildByIdUseCase(client);
}
