import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';

export const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [Player],
  synchronize: true,
};
