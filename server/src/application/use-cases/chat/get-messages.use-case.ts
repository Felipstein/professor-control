import { mainLogger } from '@infra/logger';
import {
  GetMessagesParamsRequest,
  GetMessagesResponse,
} from '@professor-control/contracts';
import chalk from 'chalk';
import { ChannelType, Client } from 'discord.js';

const logger = mainLogger.context('GET MESSAGES/USE CASE', chalk.yellow);

type Input = GetMessagesParamsRequest;

type Output = GetMessagesResponse;

type Message = GetMessagesResponse['messages'][number];

export class GetMessagesUseCase {
  constructor(private readonly client: Client) {}

  async execute({ channelId }: Input): Promise<Output> {
    logger.debug('Fetching channel');

    const channel = await this.client.channels.fetch(channelId);
    if (!channel) {
      throw new Error(`Canal ${channelId} não encontrado`);
    }

    const isTextChannel = channel.type === ChannelType.GuildText;
    if (!isTextChannel) {
      throw new Error(`Canal ${channelId} não é do tipo texto`);
    }

    logger.debug('Fetching guild and messages');

    const [guild, messagesFetched] = await Promise.all([
      channel.guild.fetch(),
      channel.messages.fetch(),
    ]);

    logger.debug('Fetching members');

    const members = await guild.members.fetch();

    const messages = messagesFetched.map((message) => {
      const { author } = message;

      const memberAuthor = members.find((member) => member.id === author.id);

      return {
        id: message.id,
        content: message.content,
        author: {
          id: author.id,
          username: author.username,
          globalName: author.globalName || author.username,
          serverName: memberAuthor?.nickname || null,
          avatar: author.avatar || 'none',
          serverAvatar: memberAuthor?.avatar || null,
          bot: author.bot,
        },
      } satisfies Message;
    }) as Message[];

    return {
      messages,
    };
  }
}
