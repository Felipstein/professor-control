import { Client } from 'discord.js';

import { GuildListed } from '../../../@types/guild-listed';

export class ListGuildsUseCase {
  constructor(private readonly client: Client) {}

  async execute(): Promise<GuildListed[]> {
    const guilds = await this.client.guilds.fetch();

    return guilds.map((guild) => ({
      id: guild.id,
      name: guild.name,
      avatarKey: guild.icon || 'none',
    }));
  }
}
