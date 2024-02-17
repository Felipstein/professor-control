import { GetMessagesUseCase } from '@application/use-cases/chat/get-messages.use-case';
import {
  GetMessagesResponse,
  getMessagesParamsRequest,
} from '@professor-control/contracts';
import { Request, Response } from 'express';

export class ChatController {
  constructor(private readonly getMessagesUseCase: GetMessagesUseCase) {}

  async getMessages(req: Request, res: Response) {
    const { channelId } = getMessagesParamsRequest.parse(req.params);

    const { messages } = await this.getMessagesUseCase.execute({ channelId });

    const response: GetMessagesResponse = {
      messages,
    };

    return res.json(response);
  }
}
