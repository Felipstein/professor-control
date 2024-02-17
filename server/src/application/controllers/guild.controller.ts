import { GetGuildByIdUseCase } from '@application/use-cases/guilds/get-guild-by-id.use-case';
import { ListGuildsUseCase } from '@application/use-cases/guilds/list-guilds.use-case';
import {
  GetGuildByIdResponse,
  GetGuildsResponse,
  getGuildByIdParamsRequest,
} from '@professor-control/contracts';
import { Request, Response } from 'express';

export class GuildController {
  constructor(
    private readonly listGuildsUseCase: ListGuildsUseCase,
    private readonly getGuildByIdUseCase: GetGuildByIdUseCase,
  ) {}

  async getGuilds(req: Request, res: Response) {
    const guilds = await this.listGuildsUseCase.execute();

    const response: GetGuildsResponse = {
      guilds,
    };

    return res.json(response);
  }

  async getGuildById(req: Request, res: Response) {
    const { guildId } = getGuildByIdParamsRequest.parse(req.params);

    const guild = await this.getGuildByIdUseCase.execute({ id: guildId });

    const response: GetGuildByIdResponse = guild;

    return res.json(response);
  }
}
