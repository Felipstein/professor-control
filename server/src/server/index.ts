import { makeClient } from '@factories/make-client';
import { mainLogger } from '@infra/logger';
import chalk from 'chalk';

import { app } from './app';
import { listen } from './appListen';

const logger = mainLogger.context('SERVER', chalk.blue);

async function initializeServer() {
  logger.info('Connecting professor and starting server...');

  await Promise.all([
    makeClient().login(process.env.DISCORD_BOT_TOKEN),
    listen(app, process.env.PORT),
  ]);

  logger.info(`Professor connected and server started on ${process.env.PORT}`);
}

initializeServer().catch((error) => {
  logger.error(error);
  process.exit(1);
});
