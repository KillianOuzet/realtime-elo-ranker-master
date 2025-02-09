import { PlayerService } from './../player/player.service';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PublishMatchDto } from './dto/publish-match.dto';

@Injectable()
export class MatchService {
  constructor(private playerService: PlayerService) {}

  async publishResults(publishMatchDto: PublishMatchDto) {
    const { winner: winnerId, loser: loserId, draw } = publishMatchDto;

    let winner, loser;

    try {
      winner = await this.playerService.getPlayerById(winnerId);
      loser = await this.playerService.getPlayerById(loserId);

      if (!winner || !loser) {
        throw new UnprocessableEntityException("Un des joueurs n'existe pas");
      }

      const { newWinnerRank, newLoserRank } = this.calculateElo(
        winner.rank,
        loser.rank,
        draw,
      );

      const updatedWinner = await this.playerService.updatePlayerRank(
        winner.id,
        newWinnerRank,
      );
      const updatedLoser = await this.playerService.updatePlayerRank(
        loser.id,
        newLoserRank,
      );

      return {
        winner: { id: updatedWinner.id, rank: updatedWinner.rank },
        loser: { id: updatedLoser.id, rank: updatedLoser.rank },
        draw: draw,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new UnprocessableEntityException("Un des joueurs n'existe pas");
      } else {
        throw error;
      }
    }
  }

  /**
   * Algorithme Elo de calcul des rangs
   * @param winnerRank Rang actuel du gagnant
   * @param loserRank Rang actuel du perdant
   * @param draw Désignation d'un match null
   * @returns Nouveaux rangs pour le gagnant et le perdant
   */
  private calculateElo(
    winnerRank: number,
    loserRank: number,
    draw: boolean = false,
  ): { newWinnerRank: number; newLoserRank: number } {
    const k = 32; // Facteur de mise à jour
    const expectedWinner =
      1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
    const expectedLoser =
      1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));

    let newWinnerRank, newLoserRank;

    if (draw) {
      newWinnerRank = Math.round(winnerRank + k * (0.5 - expectedWinner));
      newLoserRank = Math.round(loserRank + k * (0.5 - expectedLoser));
    } else {
      newWinnerRank = Math.round(winnerRank + k * (1 - expectedWinner));
      newLoserRank = Math.round(loserRank + k * (0 - expectedLoser));
    }

    return { newWinnerRank, newLoserRank };
  }
}
