import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
