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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./entities/player.entity");
let PlayersService = class PlayersService {
    constructor(playersRepository) {
        this.playersRepository = playersRepository;
    }
    async create(createPlayerDto) {
        if (!createPlayerDto.id) {
            throw new common_1.BadRequestException('Invalid player ID');
        }
        const existingPlayer = await this.playersRepository.findOne({
            where: { id: createPlayerDto.id },
        });
        if (existingPlayer) {
            throw new common_1.ConflictException('Player already exists');
        }
        const player = this.playersRepository.create({
            id: createPlayerDto.id,
            rank: createPlayerDto.baseRank ?? 1000,
        });
        return await this.playersRepository.save(player);
    }
    findAll() {
        return `This action returns all players`;
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
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlayersService);
//# sourceMappingURL=player.service.js.map