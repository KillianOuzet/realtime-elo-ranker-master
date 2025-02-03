import { PlayerService } from './../player/player.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RankingService {
  constructor(private playerService: PlayerService) {}

  findAll(callback: (error: Error | null, result?: any) => void) {
    try {
      const result = this.playerService.findAll();
      callback(null, result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        callback(
          new NotFoundException(
            "Le classement n'est pas disponible car aucun joueur n'existe",
          ),
        );
      } else {
        callback(error);
      }
    }
  }
}
