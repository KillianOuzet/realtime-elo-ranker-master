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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let RankingService = class RankingService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.ladder = [];
    }
    initLadder(players) {
        this.ladder = players
            .map((player) => ({
            id: player.id,
            rank: player.rank,
        }))
            .sort((a, b) => b.rank - a.rank);
        return this.ladder;
    }
    getLadder() {
        return this.ladder;
    }
    addPlayer(createRankingDto) {
        this.ladder.push(createRankingDto);
        this.ladder.sort((a, b) => b.rank - a.rank);
        this.eventEmitter.emit('player.created', createRankingDto);
    }
    UpdatePlayerRank(updateRankingDto) {
        this.ladder = this.ladder.map((p) => p.id === updateRankingDto.id ? { ...p, rank: updateRankingDto.rank } : p);
        this.ladder.sort((a, b) => b.rank - a.rank);
        this.eventEmitter.emit('player.updated', updateRankingDto);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], RankingService);
//# sourceMappingURL=ranking.service.js.map