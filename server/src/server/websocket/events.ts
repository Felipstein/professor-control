import { Socket } from 'socket.io';
import { socketLogger } from '.';
import {
  SendMessagePayload,
  SendTypingPayload,
} from '@professor-control/contracts';
import { client } from '../../discordBot';

export function setupWebsocketEvents(socket: Socket) {
  socket.on('joinChannel', (channelId: string) => {
    socketLogger.info(`Socket ${socket.id} joined to channel ${channelId}`);

    socket.join(channelId);
  });

  socket.on('leaveChannel', (channelId: string) => {
    socketLogger.info(`Socket ${socket.id} left channel ${channelId}`);

    socket.leave(channelId);
  });

  socket.on('send-message', async (payload: SendMessagePayload) => {
    socketLogger.debug('Sending message', payload);

    const { message, channelId } = payload;

    if (!message) {
      socketLogger.debug('Message is empty');
      return;
    }

    const channel = await client.channels.fetch(channelId);

    if (!channel?.isTextBased()) {
      socketLogger.debug('Channel is not text based or do not exists');
      return;
    }

    channel.send(message);
  });

  socket.on('send-typing', async (payload: SendTypingPayload) => {
    socketLogger.debug('Sending typing', payload);

    const { channelId } = payload;

    const channel = await client.channels.fetch(channelId);

    if (!channel?.isTextBased()) {
      socketLogger.debug('Channel is not text based or do not exists');
      return;
    }

    channel.sendTyping();
  });
}
