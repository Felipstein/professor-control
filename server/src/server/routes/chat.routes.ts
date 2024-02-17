import { makeChatController } from '@factories/make-chat-controller';
import { Router } from 'express';

const route = Router();

const controller = makeChatController();

route.get(
  '/channels/:channelId/messages',
  controller.getMessages.bind(controller),
);

export { route as chatRoutes };
