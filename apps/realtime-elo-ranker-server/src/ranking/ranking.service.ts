import { PlayerService } from './../player/player.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RankingService {
  constructor(private playerService: PlayerService) {}

  findAll() {
    try {
      return this.playerService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          "Le classement n'est pas disponible car aucun joueur n'existe",
        );
      }
      throw error;
    }
  }
}
