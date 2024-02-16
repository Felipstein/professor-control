import { GetGuildsResponse } from '@professor-control/contracts';
import { AxiosInstance } from 'axios';

import { GuildListed } from '@/@types/guild-listed';

import { IGuildService } from '../guild.service';

export class APIGuildService implements IGuildService {
  constructor(private readonly api: AxiosInstance) {}

  async getGuilds(): Promise<GuildListed[]> {
    const response = await this.api.get<GetGuildsResponse>('/guilds');

    return response.data.guilds;
  }
}
