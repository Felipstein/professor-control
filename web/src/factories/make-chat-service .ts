import { IChatService } from '@/services/guilds/chat.service';
import { makeAPI } from './make-api';
import { APIChatService } from '@/services/guilds/impl/api-chat.service';

const chatService = new APIChatService(makeAPI());

export function makeChatService(): IChatService {
  return chatService;
}
