import {
  GetGuildByIdResponse,
  GetGuildsResponse,
} from '@professor-control/contracts';
import { AxiosInstance } from 'axios';

import { GuildListed } from '@/@types/guild-listed';

import { GetGuildByIdRequest, IGuildService } from '../guild.service';
import { Guild } from '@/@types/guild';

export class APIGuildService implements IGuildService {
  constructor(private readonly api: AxiosInstance) {}

  async getGuilds(): Promise<GuildListed[]> {
    const response = await this.api.get<GetGuildsResponse>('/guilds');

    return response.data.guilds;
  }

  async getGuildById({ guildId }: GetGuildByIdRequest): Promise<Guild> {
    const response = await this.api.get<GetGuildByIdResponse>(
      `/guilds/${guildId}`,
    );

    return response.data;
  }
}
