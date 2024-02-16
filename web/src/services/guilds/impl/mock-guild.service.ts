import { faker } from '@faker-js/faker';

import { random } from '@/utils/random';

import type { IGuildService } from '../guild.service';
import type { GuildListed } from '@/@types/guild-listed';

export class MockGuildService implements IGuildService {
  private readonly guildsListed: GuildListed[] = [];

  constructor() {
    const totalGuilds = random(4, 8);

    for (let i = 0; i < totalGuilds; i++) {
      this.guildsListed.push({
        id: faker.string.uuid(),
        name: faker.company.name(),
        avatarKey: faker.string.uuid(),
      });
    }
  }

  async getGuilds(): Promise<GuildListed[]> {
    return this.guildsListed;
  }
}
