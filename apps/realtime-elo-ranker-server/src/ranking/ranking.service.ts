import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RankingService {
  constructor(private eventEmitter: EventEmitter2) {}

  private ladder: { id: string; rank: number }[];

  initLadder(players: { id: string; rank: number }[]) {
    this.ladder = players
      .map((player) => ({
        id: player.id,
        rank: player.rank,
      }))
      .sort((a, b) => b.rank - a.rank);
    console.log('initLadder', this.ladder);
  }

  getLadder() {
    return this.ladder;
  }

  addPlayer(createRankingDto: CreateRankingDto) {
    this.ladder.push(createRankingDto);
    this.ladder.sort((a, b) => b.rank - a.rank);
    this.eventEmitter.emit('player.created', createRankingDto);
  }

  UpdatePlayerRank(updateRankingDto: UpdateRankingDto) {
    this.ladder = this.ladder.map((p) =>
      p.id === updateRankingDto.id ? { ...p, rank: updateRankingDto.rank } : p,
    );
    this.ladder.sort((a, b) => b.rank - a.rank);
    this.eventEmitter.emit('player.updated', updateRankingDto);
  }

  // findAll(callback: (error: Error | null, result?: any) => void) {
  //   try {
  //     const result = this.playerService.findAll();
  //     callback(null, result);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       callback(
  //         new NotFoundException(
  //           "Le classement n'est pas disponible car aucun joueur n'existe",
  //         ),
  //       );
  //     } else {
  //       callback(error);
  //     }
  //   }
  // }
}
