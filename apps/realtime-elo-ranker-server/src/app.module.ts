import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';
import { Player } from './player/entities/player.entity';
import { testConfig } from './config/test.config';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';

@Module({
  imports: [
    PlayerModule,
    MatchModule,
    RankingModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        if (process.env.NODE_ENV === 'test') {
          return testConfig;
        }
        return {
          type: 'sqlite',
          database: 'eloranker.sqlite',
          entities: [Player],
          synchronize: true,
        };
      },
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
