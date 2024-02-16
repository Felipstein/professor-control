import { ListGuildsUseCase } from '@application/use-cases/guilds/list-guilds.use-case';
import { GetGuildsResponse } from '@professor-control/contracts';
import { Request, Response } from 'express';

export class GuildController {
  constructor(private readonly listGuildsUseCase: ListGuildsUseCase) {}

  async getGuilds(req: Request, res: Response) {
    const guilds = await this.listGuildsUseCase.execute();

    const response: GetGuildsResponse = {
      guilds,
    };

    return res.json(response);
  }
}
