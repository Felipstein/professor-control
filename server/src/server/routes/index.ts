import { Router } from 'express';

import { guildRoutes } from './guild.routes';

const routes = Router();

routes.use(guildRoutes);

export { routes };
