import { Chalk } from 'chalk';
import { clone } from 'lodash';
import winston, { createLogger } from 'winston';

import addTransports from './addTransports';
import { consoleTransports } from './consoleTransports';

function buildLogger() {
  const loggerMainInstance = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  });

  addTransports(loggerMainInstance, consoleTransports);

  type Logger = winston.Logger & {
    context: (context: string, color?: Chalk) => winston.Logger;
  };

  const logger = clone(loggerMainInstance) as Logger;

  logger.context = (context, color) => {
    const contextColored = color ? color(context) : context;

    return logger.child({ _logs_context: contextColored });
  };

  return logger;
}

const mainLogger = buildLogger();

export { mainLogger };
