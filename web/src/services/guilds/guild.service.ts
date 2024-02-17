import { Guild } from '@/@types/guild';
import { GuildListed } from '@/@types/guild-listed';
import { GetGuildByIdParamsRequest } from '@professor-control/contracts';

export type GetGuildByIdRequest = GetGuildByIdParamsRequest;

export interface IGuildService {
  getGuilds(): Promise<GuildListed[]>;

  getGuildById(request: GetGuildByIdRequest): Promise<Guild>;
}
