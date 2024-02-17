import { GetMessagesUseCase } from '@application/use-cases/chat/get-messages.use-case';
import { client } from '../discordBot';

export function makeGetMessagesUseCase() {
  return new GetMessagesUseCase(client);
}
