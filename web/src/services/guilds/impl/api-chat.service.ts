import { AxiosInstance } from 'axios';
import { GetMessagesRequest, IChatService } from '../chat.service';
import { Message } from '@/@types/message';
import { GetMessagesResponse } from '@professor-control/contracts';

export class APIChatService implements IChatService {
  constructor(private readonly api: AxiosInstance) {}

  async getMessages({ channelId }: GetMessagesRequest): Promise<Message[]> {
    const response = await this.api.get<GetMessagesResponse>(
      `/channels/${channelId}/messages`,
    );

    return response.data.messages;
  }
}
