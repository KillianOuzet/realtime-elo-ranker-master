import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    PlayerModule,
    MatchModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'eloranker.sqlite',
      entities: [Player],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
