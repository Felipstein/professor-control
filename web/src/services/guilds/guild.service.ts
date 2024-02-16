import { GuildListed } from '@/@types/guild-listed';

export interface IGuildService {
  getGuilds(): Promise<GuildListed[]>;
}
