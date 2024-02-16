import { makeGuildController } from '@factories/make-guild-controller';
import { Router } from 'express';

const route = Router();

const controller = makeGuildController();

route.get('/guilds', controller.getGuilds.bind(controller));

export { route as guildRoutes };
