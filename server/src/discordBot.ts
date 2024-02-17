import { mainLogger } from '@infra/logger';
import {
  ReceiveMessageInOtherChannelPayload,
  ReceiveMessagePayload,
  ReceiveTypingPayload,
} from '@professor-control/contracts';
import { io } from '@server/app';
import chalk from 'chalk';
import { Client, GatewayIntentBits } from 'discord.js';

const logger = mainLogger.context('CLIENT', chalk.rgb(255, 106, 0));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

logger.info('Discord client initialized');

client.once('ready', () => {
  logger.info('Discord client ready');
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user?.id) {
    logger.debug(
      chalk.gray('Discord client received message in'),
      message.channel.id,
      chalk.gray('by'),
      chalk.yellow(message.author.username),
    );
  }

  const {
    channel: { id: channelId },
    guildId,
    author,
    ...messagePayload
  } = message;

  const members = await message.guild?.members.fetch();

  const authorMember = members?.find((member) => member.id === author.id);

  const payload: ReceiveMessagePayload = {
    channelId,
    message: {
      id: messagePayload.id,
      content: messagePayload.content,
      author: {
        id: author.id,
        username: author.username,
        globalName: author.globalName || author.username,
        serverName: authorMember?.nickname || null,
        serverAvatar: authorMember?.avatar || null,
        avatar: author.avatar || 'none',
        bot: author.bot,
      },
    },
  };

  io.to(channelId).emit('receive-message', payload);

  if (guildId) {
    const payload2: ReceiveMessageInOtherChannelPayload = {
      channelId,
      guildId,
    };

    io.emit('receive-message-in-other-channel', payload2);
  }
});

client.on('typingStart', async (typing) => {
  const {
    channel: { id: channelId },
    user: { id: userId },
  } = typing;

  if (userId === client.user?.id) {
    return;
  }

  const payload: ReceiveTypingPayload = {
    channelId,
  };

  io.to(channelId).emit('receive-typing', payload);
});

export { client };
