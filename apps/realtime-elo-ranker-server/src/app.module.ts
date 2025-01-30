import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';

@Module({
  imports: [
    PlayerModule,
    MatchModule,
    RankingModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'eloranker.sqlite',
      entities: [Player],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
