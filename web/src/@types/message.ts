import { GetMessagesResponse } from '@professor-control/contracts';

export type Message = GetMessagesResponse['messages'][number];
