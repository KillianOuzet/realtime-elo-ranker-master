import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    PlayersModule,
    MatchModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'eloranker.sqlite',
      entities: [Player],
      synchronize: true,
    }),
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
