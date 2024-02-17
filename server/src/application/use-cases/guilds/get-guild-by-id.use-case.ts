import { mainLogger } from '@infra/logger';
import { GetGuildByIdResponse } from '@professor-control/contracts';
import chalk from 'chalk';
import { Client } from 'discord.js';

const logger = mainLogger.context('GET GUILD BY ID/USE CASE', chalk.magenta);

type Input = {
  id: string;
};

type Output = GetGuildByIdResponse;

type GuildChannel = GetGuildByIdResponse['channels'][number];
type GuildMember = GetGuildByIdResponse['members'][number];
type ChannelType = GuildChannel['type'];

const channelTypeMapper: Record<number, ChannelType> = {
  0: 'text',
  2: 'voice',
  4: 'category',
  13: 'stage',
  15: 'forum',
};

export class GetGuildByIdUseCase {
  constructor(private readonly client: Client) {}

  async execute({ id }: Input): Promise<Output> {
    logger.debug('Fetching guild', id);

    const guild =
      this.client.guilds.cache.get(id) || (await this.client.guilds.fetch(id));

    logger.debug('Fetching channels', id);

    const channels = (await guild.channels.fetch())
      .map((channel) => {
        if (!channel) {
          return null;
        }

        let nsfw = false;

        if ('nsfw' in channel) {
          nsfw = channel.nsfw;
        }

        const type = channelTypeMapper[channel.type];

        if (!type) {
          return null;
        }

        return {
          id: channel!.id,
          name: channel!.name,
          parentId: channel!.parentId,
          position: channel!.rawPosition,
          nsfw,
          type,
        } satisfies GuildChannel;
      })
      .filter(Boolean) as GuildChannel[];

    logger.debug('Fetching members', id);

    const members = (await guild.members.fetch())
      .map((member) => {
        return {
          id: member.id,
          username: member.user.username,
          globalName: member.user.globalName || member.user.username,
          serverName: member.nickname,
          avatar: member.user.avatar || 'none',
          serverAvatar: member.avatar,
          bot: member.user.bot,
        } satisfies GuildMember;
      })
      .filter(Boolean) as GuildMember[];

    logger.debug('Guild and your channels & members fetched.', id);

    return {
      id: guild.id,
      name: guild.name,
      avatarKey: guild.icon || 'none',
      channels,
      members,
    };
  }
}
