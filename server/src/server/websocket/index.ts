import { mainLogger } from '@infra/logger';
import chalk from 'chalk';
import { Server as HTTPServer } from 'node:http';
import { Server } from 'socket.io';
import { setupWebsocketEvents } from './events';

const logger = mainLogger.context('SOCKET', chalk.rgb(0, 255, 251));

export function initWebSocket(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  logger.info('Websocket initialized');

  io.on('connection', (socket) => {
    logger.info('BOT/User connected in', socket.id);

    setupWebsocketEvents(socket);
  });

  return io;
}

export { logger as socketLogger };
