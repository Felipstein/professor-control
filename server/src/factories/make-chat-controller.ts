import { ChatController } from '@application/controllers/chat.controller';
import { makeGetMessagesUseCase } from './make-get-messages-use-case';

export function makeChatController() {
  return new ChatController(makeGetMessagesUseCase());
}
