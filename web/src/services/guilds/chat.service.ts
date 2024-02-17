import { Message } from '@/@types/message';
import { GetMessagesParamsRequest } from '@professor-control/contracts';

export type GetMessagesRequest = GetMessagesParamsRequest;

export interface IChatService {
  getMessages(request: GetMessagesRequest): Promise<Message[]>;
}
