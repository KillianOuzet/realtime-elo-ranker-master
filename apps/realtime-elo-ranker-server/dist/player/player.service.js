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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./entities/player.entity");
const ranking_service_1 = require("../ranking/ranking.service");
let PlayerService = class PlayerService {
    constructor(playerRepository, rankingService) {
        this.playerRepository = playerRepository;
        this.rankingService = rankingService;
    }
    async onModuleInit() {
        try {
            const players = await this.findAll();
            this.rankingService.initLadder(players);
        }
        catch (error) {
            throw new common_1.NotFoundException('Impossible de récupérer les classements des joueurs');
        }
    }
    async create(createPlayerDto) {
        if (!createPlayerDto.id) {
            throw new common_1.BadRequestException("L'identifiant du joueur n'est pas valide");
        }
        const existingPlayer = await this.playerRepository.findOne({
            where: { id: createPlayerDto.id },
        });
        if (existingPlayer) {
            throw new common_1.ConflictException('Le joueur existe déjà');
        }
        const baseRank = createPlayerDto.baseRank ?? (await this.getAverageRank());
        const player = this.playerRepository.create({
            id: createPlayerDto.id,
            rank: baseRank,
        });
        this.rankingService.addPlayer(player);
        return await this.playerRepository.save(player);
    }
    getPlayerById(id) {
        return this.playerRepository.findOne({ where: { id: id } });
    }
    async updatePlayerRank(id, newRank) {
        const player = await this.getPlayerById(id);
        if (!player) {
            throw new common_1.BadRequestException('Player not found');
        }
        player.rank = newRank;
        this.rankingService.UpdatePlayerRank(player);
        return this.playerRepository.save(player);
    }
    async getAverageRank() {
        const players = await this.playerRepository.find();
        if (players.length === 0) {
            return 100;
        }
        const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
        return Math.round(totalRank / players.length);
    }
    async findAll() {
        const players = await this.playerRepository.find();
        if (players.length === 0) {
            throw new common_1.NotFoundException("Le classement n'est pas disponible car aucun joueur n'existe");
        }
        return players;
    }
    findOne(id) {
        return `This action returns a #${id} player`;
    }
    update(id, updatePlayerDto) {
        return `This action updates a #${id} player`;
    }
    remove(id) {
        return `This action removes a #${id} player`;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_service_1.RankingService])
], PlayerService);
//# sourceMappingURL=player.service.js.map