import { GetGuildByIdUseCase } from '@application/use-cases/guilds/get-guild-by-id.use-case';
import { makeClient } from './make-client';

export function makeGetGuildByIdUseCase() {
  return new GetGuildByIdUseCase(makeClient());
}
