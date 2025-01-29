"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const player_service_1 = require("./../player/player.service");
const common_1 = require("@nestjs/common");
let MatchService = class MatchService {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async publishResults(publishMatchDto) {
        const { winner: winnerId, loser: loserId, draw } = publishMatchDto;
        const winner = await this.playerService.getPlayerById(winnerId);
        const loser = await this.playerService.getPlayerById(loserId);
        if (!winner || !loser) {
            throw new Error('One or both players not found');
        }
        const { newWinnerRank, newLoserRank } = this.calculateElo(winner.rank, loser.rank, draw);
        const updatedWinner = await this.playerService.updatePlayerRank(winner.id, newWinnerRank);
        const updatedLoser = await this.playerService.updatePlayerRank(loser.id, newLoserRank);
        return {
            winner: { id: updatedWinner.id, rank: updatedWinner.rank },
            loser: { id: updatedLoser.id, rank: updatedLoser.rank },
            draw: draw,
        };
    }
    calculateElo(winnerRank, loserRank, draw = false) {
        const k = 32;
        const expectedWinner = 1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));
        let newWinnerRank, newLoserRank;
        if (draw) {
            newWinnerRank = Math.round(winnerRank + k * (0.5 - expectedWinner));
            newLoserRank = Math.round(loserRank + k * (0.5 - expectedLoser));
        }
        else {
            newWinnerRank = Math.round(winnerRank + k * (1 - expectedWinner));
            newLoserRank = Math.round(loserRank + k * (0 - expectedLoser));
        }
        return { newWinnerRank, newLoserRank };
    }
    findAll() {
        return `This action returns all match`;
    }
    findOne(id) {
        return `This action returns a #${id} match`;
    }
    update(id, updateMatchDto) {
        return `This action updates a #${id} match`;
    }
    remove(id) {
        return `This action removes a #${id} match`;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map