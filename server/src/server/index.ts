import { mainLogger } from '@infra/logger';
import chalk from 'chalk';

import { server } from './app';
import { listen } from './appListen';
import { client } from '../discordBot';

const logger = mainLogger.context('SERVER', chalk.blue);

async function initializeServer() {
  logger.info('Connecting professor and starting server...');

  await Promise.all([
    client.login(process.env.DISCORD_BOT_TOKEN),
    listen(server, process.env.PORT),
  ]);

  logger.info(`Professor connected and server started on ${process.env.PORT}`);
}

initializeServer().catch((error) => {
  logger.error(error);
  process.exit(1);
});
