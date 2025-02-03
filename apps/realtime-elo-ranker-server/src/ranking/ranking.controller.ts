import { Player } from './../player/entities/player.entity';
import { Controller, Get, NotFoundException, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { fromEvent, map, merge, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('/events')
  sse(): Observable<MessageEvent> {
    const playerCreated = fromEvent(this.eventEmitter, 'player.created').pipe(
      map(
        (player: Player) =>
          <MessageEvent>{
            data: {
              type: 'RankingUpdate',
              player: {
                id: player.id,
                rank: player.rank,
              },
            },
          },
      ),
    );

    const playerUpdated = fromEvent(this.eventEmitter, 'player.updated').pipe(
      map(
        (player: Player) =>
          <MessageEvent>{
            data: {
              type: 'RankingUpdate',
              player: {
                id: player.id,
                rank: player.rank,
              },
            },
          },
      ),
    );

    return merge(playerCreated, playerUpdated);
  }

  @Get()
  findAll() {
    return new Promise((resolve, reject) => {
      this.rankingService.findAll((error, result) => {
        if (error) {
          if (error instanceof NotFoundException) {
            resolve({
              code: 404,
              message: error.message,
            });
          } else {
            reject(error);
          }
        } else {
          resolve(result);
        }
      });
    });
  }
}
