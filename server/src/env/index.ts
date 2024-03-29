import 'dotenv/config';
import { mainLogger } from '@infra/logger';
import chalk from 'chalk';
import { ZodError, z } from 'zod';

import { logsEnvSchema } from './logsEnv';

const logger = mainLogger.context('ENV', chalk.rgb(138, 11, 49));

const envVariablesSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']),

    PORT: z.coerce.number(),

    ORIGINS: z.string().transform((origins) => origins.split(';')),

    DISCORD_BOT_TOKEN: z.string(),
  })
  .and(logsEnvSchema);

try {
  const parsed = envVariablesSchema.parse(process.env);

  // @ts-expect-error
  process.env = {
    ...process.env,
    ...parsed,
  };

  logger.info('Environment variables loaded.');
} catch (err: Error | unknown) {
  if (err instanceof ZodError) {
    const variables: { env: string; message: string }[] = err.issues.map(
      (issue) => ({ env: issue.path.join('.'), message: issue.message }),
    );

    console.info('');
    logger.error(chalk.red.bold('Wrong environment variables:'));

    variables.forEach((variable) => {
      logger.error(
        chalk.gray('-'),
        chalk.white(`${variable.env}:`),
        variable.message,
      );
    });

    process.exit(1);
  }

  throw err;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
