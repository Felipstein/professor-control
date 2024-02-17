import { Router } from 'express';

import { chatRoutes } from './chat.routes';
import { guildRoutes } from './guild.routes';

const routes = Router();

routes.use(chatRoutes);
routes.use(guildRoutes);

export { routes };
