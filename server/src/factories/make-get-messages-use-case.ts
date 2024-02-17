import { GetMessagesUseCase } from '@application/use-cases/chat/get-messages.use-case';
import { makeClient } from './make-client';

export function makeGetMessagesUseCase() {
  return new GetMessagesUseCase(makeClient());
}
